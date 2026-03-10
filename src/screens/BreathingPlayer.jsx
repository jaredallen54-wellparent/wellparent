import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { breathingExercises } from '../data/mentalHealth';

const CIRCLE_MIN = 80;
const CIRCLE_MAX = 140;

export default function BreathingPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const exercise = breathingExercises.find(b => b.id === id);

  const [isPaused, setIsPaused] = useState(false);
  const [round, setRound] = useState(1);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercise?.phases[0]?.duration ?? 4);
  const [circleSize, setCircleSize] = useState(CIRCLE_MIN);
  const [isComplete, setIsComplete] = useState(false);

  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  useEffect(() => {
    if (!exercise) return;
    capture('breathing_started', { exercise_id: id });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!exercise || isPaused || isComplete) return;

    const phase = exercise.phases[phaseIndex];
    const isInhale = phase.label === 'Inhale';
    const isExhale = phase.label === 'Exhale';

    // Animate circle size based on phase
    if (isInhale) setCircleSize(CIRCLE_MAX);
    else if (isExhale) setCircleSize(CIRCLE_MIN);

    const tick = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          // Advance phase
          const nextPhase = phaseIndex + 1;
          if (nextPhase >= exercise.phases.length) {
            // End of round
            if (round >= exercise.rounds) {
              setIsComplete(true);
              capture('breathing_completed', { exercise_id: id, rounds: round });
            } else {
              setRound(r => r + 1);
              setPhaseIndex(0);
              setTimeLeft(exercise.phases[0].duration);
            }
          } else {
            setPhaseIndex(nextPhase);
            setTimeLeft(exercise.phases[nextPhase].duration);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [phaseIndex, round, isPaused, isComplete, exercise, id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!exercise) {
    return (
      <div className="min-h-screen bg-forest flex items-center justify-center">
        <p className="text-cream font-dm">Exercise not found.</p>
      </div>
    );
  }

  const phase = exercise.phases[phaseIndex];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 text-center gap-8">
        <h1 className="font-playfair text-cream text-4xl font-bold italic">
          {exercise.rounds} rounds. Done.
        </h1>
        <p className="font-dm text-cream/70 text-lg">
          That's yours.
        </p>
        <button
          onClick={() => navigate('/mind')}
          className="bg-cream text-forest font-dm font-semibold text-lg rounded-full px-10 py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Back to Mind
        </button>
      </div>
    );
  }

  if (isPaused) {
    return (
      <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 py-16">
        <h1 className="font-playfair text-cream text-4xl font-bold italic text-center mb-16">
          Paused. Take your time.
        </h1>
        <div className="flex flex-col items-center gap-5 w-full max-w-sm">
          <button
            onClick={() => setIsPaused(false)}
            className="w-full bg-cream text-forest font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
          >
            Resume
          </button>
          <button
            onClick={() => navigate('/mind')}
            className="text-cream/40 font-dm text-sm min-h-[44px] px-4"
          >
            End Exercise
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest flex flex-col select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button
          onClick={() => navigate('/mind')}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2"
        >
          ← Back
        </button>
        <span className="font-dm text-white/30 text-xs">
          Round {round} of {exercise.rounds}
        </span>
      </div>

      {/* Title */}
      <div className="px-6 mb-8 text-center">
        <h1 className="font-playfair text-cream text-2xl font-bold">{exercise.name}</h1>
      </div>

      {/* Breathing circle */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div
          className="rounded-full bg-sage/20 flex items-center justify-center"
          style={{
            width: circleSize,
            height: circleSize,
            transition: `width ${phase.duration * 0.9}s ease-in-out, height ${phase.duration * 0.9}s ease-in-out`,
            boxShadow: `0 0 ${circleSize * 0.3}px rgba(122,175,150,0.15)`,
          }}
        >
          <div
            className="rounded-full bg-sage/30 flex items-center justify-center"
            style={{
              width: circleSize * 0.65,
              height: circleSize * 0.65,
              transition: `width ${phase.duration * 0.9}s ease-in-out, height ${phase.duration * 0.9}s ease-in-out`,
            }}
          >
            <span className="font-playfair text-cream text-3xl font-bold">{timeLeft}</span>
          </div>
        </div>

        {/* Phase label */}
        <div className="text-center">
          <p className="font-dm text-cream text-2xl font-medium tracking-wide">{phase.label}</p>
          {phase.label === 'Inhale' && (
            <p className="font-dm text-cream/50 text-sm mt-1">breathe in slowly</p>
          )}
          {phase.label === 'Exhale' && (
            <p className="font-dm text-cream/50 text-sm mt-1">breathe out slowly</p>
          )}
          {phase.label === 'Hold' && (
            <p className="font-dm text-cream/50 text-sm mt-1">hold gently</p>
          )}
        </div>
      </div>

      {/* Pause button */}
      <div className="flex justify-center pb-12">
        <button
          onClick={() => setIsPaused(true)}
          className="font-dm text-cream/40 text-sm min-h-[44px] px-6 py-2"
        >
          Pause
        </button>
      </div>
    </div>
  );
}
