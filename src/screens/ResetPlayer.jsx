import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { theReset } from '../data/workouts';

const PAUSE_RING_RADIUS = 32;
const PAUSE_RING_CIRCUMFERENCE = 2 * Math.PI * PAUSE_RING_RADIUS;

const COUNTDOWN_RING_RADIUS = 90;
const COUNTDOWN_RING_CIRCUMFERENCE = 2 * Math.PI * COUNTDOWN_RING_RADIUS;

export default function ResetPlayer() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const savedWorkout = state.activeWorkout?.workoutId === theReset.id ? state.activeWorkout : null;
  const isResuming = !!(savedWorkout?.pausedAt);

  const [exerciseIndex, setExerciseIndex] = useState(savedWorkout?.exerciseIndex ?? 0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  const pauseTriggeredRef = useRef(false);
  const exerciseIndexRef = useRef(exerciseIndex);
  const resumeTimeRef = useRef(Date.now());
  const startedRef = useRef(false);
  const isCompletingRef = useRef(false);

  exerciseIndexRef.current = exerciseIndex;

  const exercise = theReset.exercises[exerciseIndex];
  const totalExercises = theReset.exercises.length;

  // Init
  useEffect(() => {
    if (!savedWorkout) {
      dispatch({ type: 'START_WORKOUT', payload: { workoutId: theReset.id, isReset: true } });
    } else if (isResuming) {
      dispatch({ type: 'RESUME_WORKOUT' });
    }
    resumeTimeRef.current = Date.now();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // PostHog
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      if (isResuming) {
        capture('wellparent_workout_resumed', {
          workout_id: theReset.id,
          exercise_index: savedWorkout?.exerciseIndex,
          pause_duration_seconds: savedWorkout?.pausedAt
            ? Math.round((Date.now() - savedWorkout.pausedAt) / 1000)
            : undefined,
        });
      } else {
        capture('wellparent_reset_started', {
          reset_id: theReset.id,
          energy_level: state.energyToday,
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Active time counter
  useEffect(() => {
    const interval = setInterval(() => setTotalSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const completeReset = useCallback(() => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;
    const elapsedSinceResume = Math.round((Date.now() - resumeTimeRef.current) / 1000);
    const prevActive = savedWorkout?.activeElapsed
      ? Math.round(savedWorkout.activeElapsed / 1000)
      : 0;
    const activeDuration = prevActive + elapsedSinceResume;
    dispatch({
      type: 'COMPLETE_WORKOUT',
      payload: { workoutId: theReset.id, paused: isResuming, activeDuration, isReset: true }
    });
    capture('wellparent_reset_completed', { reset_id: theReset.id, actual_duration: activeDuration });
    navigate('/reset/complete');
  }, [savedWorkout, isResuming, dispatch, navigate]);

  const advanceExercise = useCallback(() => {
    if (isCompletingRef.current) return;
    const nextIndex = exerciseIndexRef.current + 1;
    if (nextIndex >= totalExercises) {
      completeReset();
    } else {
      setExerciseIndex(nextIndex);
    }
  }, [totalExercises, completeReset]);

  // Long-press pause — CSS animationend (same approach as WorkoutPlayer)
  const handlePausePointerDown = (e) => {
    e.preventDefault();
    pauseTriggeredRef.current = false;
    setIsPressing(true);
  };

  const handlePausePointerUp = () => {
    if (!pauseTriggeredRef.current) {
      setIsPressing(false);
    }
  };

  const handlePauseAnimationEnd = () => {
    pauseTriggeredRef.current = true;
    setIsPressing(false);
    const elapsedSinceResume = Date.now() - resumeTimeRef.current;
    const activeElapsed = (savedWorkout?.activeElapsed ?? 0) + elapsedSinceResume;
    dispatch({
      type: 'PAUSE_WORKOUT',
      payload: {
        workoutId: theReset.id,
        exerciseIndex: exerciseIndexRef.current,
        activeElapsed,
      }
    });
    capture('wellparent_workout_paused', {
      workout_id: theReset.id,
      exercise_index: exerciseIndexRef.current,
      elapsed_seconds: Math.round(activeElapsed / 1000),
      timestamp: Date.now(),
    });
    navigate('/reset/paused');
  };

  if (!exercise) return null;

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-cream flex flex-col select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button
          onClick={() => {
            dispatch({ type: 'ABANDON_WORKOUT' });
            navigate('/home');
          }}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2"
        >
          ← Home
        </button>
        <p className="font-dm text-xs uppercase tracking-widest font-semibold" style={{ color: '#C4623A' }}>
          The Reset
        </p>
        <span className="text-mist/50 font-dm text-xs tabular-nums">
          {formatTime(totalSeconds)}
        </span>
      </div>

      {/* Progress dots in terra */}
      <div className="flex gap-1.5 px-5 mb-8">
        {theReset.exercises.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: i <= exerciseIndex ? '#C4623A' : '#E5DDD4' }}
          />
        ))}
      </div>

      {/* Exercise content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="font-dm text-mist text-xs uppercase tracking-widest mb-3">
          {exerciseIndex + 1} / {totalExercises}
        </p>
        <h1 className="font-playfair text-ink text-4xl font-bold italic leading-tight mb-4">
          {exercise.name}
        </h1>
        <p className="font-dm text-mist text-base leading-relaxed max-w-xs mb-10">
          {exercise.description}
        </p>

        {/* Countdown ring — terra colored */}
        <div className="relative flex items-center justify-center mb-8">
          <svg
            key={`countdown-${exerciseIndex}`}
            width={200} height={200}
            viewBox="0 0 200 200"
            className="-rotate-90"
          >
            <circle cx={100} cy={100} r={COUNTDOWN_RING_RADIUS}
              fill="none" stroke="rgba(196,98,58,0.12)" strokeWidth={6}
            />
            <circle cx={100} cy={100} r={COUNTDOWN_RING_RADIUS}
              fill="none" stroke="#C4623A" strokeWidth={6}
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
          <ResetCountdownTimer key={`timer-${exerciseIndex}`} duration={exercise.duration} />
        </div>
      </div>

      {/* Pause button — terra ring */}
      <div className="flex flex-col items-center pb-10 gap-3">
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
              fill="none" stroke="rgba(196,98,58,0.15)" strokeWidth={3}
            />
            <circle
              cx={40} cy={40} r={PAUSE_RING_RADIUS}
              fill="none"
              stroke="#C4623A"
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
            className="w-20 h-20 rounded-full flex items-center justify-center font-dm text-xs font-medium select-none z-10 relative touch-none border-2"
            style={{ backgroundColor: 'rgba(196,98,58,0.08)', borderColor: 'rgba(196,98,58,0.25)', color: '#C4623A' }}
            aria-label="Hold to pause"
          >
            Hold<br />Pause
          </button>
        </div>

        <button
          onClick={() => {
            dispatch({ type: 'ABANDON_WORKOUT' });
            navigate('/home');
          }}
          className="text-mist/40 font-dm text-xs min-h-[44px] px-4"
        >
          Stop Reset
        </button>
      </div>
    </div>
  );
}

function ResetCountdownTimer({ duration }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(n => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);
  return (
    <span className="absolute font-playfair text-ink text-5xl font-bold">
      {timeLeft}
    </span>
  );
}
