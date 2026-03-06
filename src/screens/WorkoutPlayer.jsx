import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { workouts } from '../data/workouts';

const PAUSE_RING_RADIUS = 32;
const PAUSE_RING_CIRCUMFERENCE = 2 * Math.PI * PAUSE_RING_RADIUS;

const COUNTDOWN_RING_RADIUS = 90;
const COUNTDOWN_RING_CIRCUMFERENCE = 2 * Math.PI * COUNTDOWN_RING_RADIUS;

export default function WorkoutPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const workout = workouts.find(w => w.id === id);
  const savedWorkout = state.activeWorkout?.workoutId === id ? state.activeWorkout : null;
  const isResuming = !!(savedWorkout?.pausedAt);

  const [exerciseIndex, setExerciseIndex] = useState(savedWorkout?.exerciseIndex ?? 0);
  const [setIndex, setSetIndex] = useState(savedWorkout?.setIndex ?? 0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  const pauseTriggeredRef = useRef(false);
  const exerciseIndexRef = useRef(exerciseIndex);
  const setIndexRef = useRef(setIndex);
  const resumeTimeRef = useRef(Date.now());
  const startedRef = useRef(false);
  const isCompletingRef = useRef(false);

  exerciseIndexRef.current = exerciseIndex;
  setIndexRef.current = setIndex;

  const exercise = workout?.exercises[exerciseIndex];
  const isTimed = exercise && 'duration' in exercise;

  // Init: start or resume
  useEffect(() => {
    if (!savedWorkout) {
      dispatch({ type: 'START_WORKOUT', payload: { workoutId: id } });
    } else if (isResuming) {
      dispatch({ type: 'RESUME_WORKOUT' });
    }
    resumeTimeRef.current = Date.now();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // PostHog: fire once per mount
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      if (isResuming) {
        capture('workout_resumed', { workoutId: id });
      } else {
        capture('workout_started', { workoutId: id, persona: state.persona });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Active time counter
  useEffect(() => {
    const interval = setInterval(() => setTotalSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const completeWorkout = useCallback(() => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;
    const elapsedSinceResume = Math.round((Date.now() - resumeTimeRef.current) / 1000);
    const prevActive = savedWorkout?.activeElapsed
      ? Math.round(savedWorkout.activeElapsed / 1000)
      : 0;
    const activeDuration = prevActive + elapsedSinceResume;
    dispatch({
      type: 'COMPLETE_WORKOUT',
      payload: { workoutId: id, paused: isResuming, activeDuration }
    });
    capture('workout_completed', { workoutId: id, paused: isResuming, duration: activeDuration });
    navigate(`/workout/${id}/complete`, { state: { activeDuration, paused: isResuming } });
  }, [id, isResuming, savedWorkout, dispatch, navigate]);

  const advanceExercise = useCallback(() => {
    if (!workout || isCompletingRef.current) return;
    const nextIndex = exerciseIndexRef.current + 1;
    if (nextIndex >= workout.exercises.length) {
      completeWorkout();
    } else {
      setExerciseIndex(nextIndex);
      setSetIndex(0);
    }
  }, [workout, completeWorkout]);

  const handleRepsDone = () => {
    if (!exercise) return;
    const nextSet = setIndexRef.current + 1;
    if (nextSet >= exercise.sets) {
      advanceExercise();
    } else {
      setSetIndex(nextSet);
    }
  };

  // Long-press: CSS animationend approach (no setInterval drift, GPU-animated ring)
  const handlePausePointerDown = (e) => {
    e.preventDefault();
    pauseTriggeredRef.current = false;
    setIsPressing(true);
  };

  const handlePausePointerUp = () => {
    if (!pauseTriggeredRef.current) {
      setIsPressing(false); // cancels animation by removing class
    }
  };

  const handlePauseAnimationEnd = () => {
    // Only fires if the 500ms animation ran to completion — not on cancel
    pauseTriggeredRef.current = true;
    setIsPressing(false);
    const elapsedSinceResume = Date.now() - resumeTimeRef.current;
    const activeElapsed = (savedWorkout?.activeElapsed ?? 0) + elapsedSinceResume;
    dispatch({
      type: 'PAUSE_WORKOUT',
      payload: {
        workoutId: id,
        exerciseIndex: exerciseIndexRef.current,
        setIndex: setIndexRef.current,
        activeElapsed,
      }
    });
    capture('workout_paused', { workoutId: id, exerciseIndex: exerciseIndexRef.current });
    navigate(`/workout/${id}/paused`);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (!workout) {
    return (
      <div className="min-h-screen bg-forest flex items-center justify-center">
        <p className="text-cream font-dm">Workout not found.</p>
      </div>
    );
  }
  if (!exercise) return null;

  return (
    <div className="min-h-screen bg-forest flex flex-col select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button
          onClick={() => {
            dispatch({ type: 'ABANDON_WORKOUT' });
            capture('workout_abandoned', { workoutId: id });
            navigate('/workouts');
          }}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2"
        >
          ← Back
        </button>
        <span className="text-white/25 font-dm text-xs tabular-nums">
          {formatTime(totalSeconds)}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 px-5 mb-6">
        {workout.exercises.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= exerciseIndex ? 'bg-sage' : 'bg-white/15'
            }`}
          />
        ))}
      </div>

      {/* Exercise info */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-mist font-dm text-xs uppercase tracking-widest mb-3">
          Exercise {exerciseIndex + 1} of {workout.exercises.length}
        </p>
        <h1 className="font-playfair text-cream text-4xl font-bold italic leading-tight mb-4">
          {exercise.name}
        </h1>
        <p className="text-mist font-dm text-base leading-relaxed max-w-xs mb-10">
          {exercise.description}
        </p>

        {/* Timed: countdown ring (key resets CSS animation cleanly on exercise change) */}
        {isTimed && (
          <div className="relative flex items-center justify-center mb-8">
            <svg
              key={`countdown-${exerciseIndex}`}
              width={200} height={200}
              viewBox="0 0 200 200"
              className="-rotate-90"
            >
              <circle cx={100} cy={100} r={COUNTDOWN_RING_RADIUS}
                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6}
              />
              <circle cx={100} cy={100} r={COUNTDOWN_RING_RADIUS}
                fill="none" stroke="#7AAF96" strokeWidth={6}
                strokeDasharray={COUNTDOWN_RING_CIRCUMFERENCE}
                strokeDashoffset={0}
                strokeLinecap="round"
                style={{
                  animation: `countdown-ring ${exercise.duration}s linear forwards`,
                  '--ring-circumference': COUNTDOWN_RING_CIRCUMFERENCE,
                }}
                onAnimationEnd={advanceExercise}
              />
            </svg>
            {/* Isolated timer avoids parent re-renders on every tick */}
            <CountdownTimer key={`timer-${exerciseIndex}`} duration={exercise.duration} />
          </div>
        )}

        {/* Reps: set counter + Done */}
        {!isTimed && (
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="text-center">
              <p className="text-mist font-dm text-sm mb-1">Set</p>
              <p className="font-playfair text-cream text-6xl font-bold">
                {setIndex + 1}
                <span className="text-white/35 text-3xl"> / {exercise.sets}</span>
              </p>
              <p className="text-mist font-dm mt-1">{exercise.reps} reps</p>
            </div>
            <button
              onClick={handleRepsDone}
              className="bg-sage text-forest font-dm font-semibold text-lg rounded-full px-10 py-4 min-h-[56px] active:scale-95 transition-transform"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Pause button — long-press with CSS animationend */}
      <div className="flex flex-col items-center pb-12 gap-3">
        <div
          className="relative flex items-center justify-center"
          style={{ '--ring-circumference': PAUSE_RING_CIRCUMFERENCE }}
        >
          <svg
            width={80} height={80}
            viewBox="0 0 80 80"
            className="absolute inset-0 pointer-events-none overflow-visible"
          >
            <circle cx={40} cy={40} r={PAUSE_RING_RADIUS}
              fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={3}
            />
            <circle
              cx={40} cy={40} r={PAUSE_RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth={3}
              strokeDasharray={PAUSE_RING_CIRCUMFERENCE}
              strokeDashoffset={PAUSE_RING_CIRCUMFERENCE}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
              className={isPressing ? 'pause-ring-fill' : ''}
              style={{ '--ring-circumference': PAUSE_RING_CIRCUMFERENCE }}
              onAnimationEnd={handlePauseAnimationEnd}
            />
          </svg>
          <button
            onPointerDown={handlePausePointerDown}
            onPointerUp={handlePausePointerUp}
            onPointerLeave={handlePausePointerUp}
            onPointerCancel={handlePausePointerUp}
            className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center font-dm text-cream text-xs font-medium select-none z-10 relative touch-none"
            aria-label="Hold to pause workout"
          >
            Hold<br />Pause
          </button>
        </div>
        <p className="text-white/20 font-dm text-xs">Hold to pause</p>
      </div>
    </div>
  );
}

// Isolated countdown display — renders independently so parent doesn't re-render every second
function CountdownTimer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(n => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);
  return (
    <span className="absolute font-playfair text-cream text-5xl font-bold">
      {timeLeft}
    </span>
  );
}
