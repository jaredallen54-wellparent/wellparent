import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { allWorkouts } from '../data/workouts';

function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s > 0 ? s + 's' : ''}`.trim();
}

export default function WorkoutComplete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useApp();

  const workout = allWorkouts.find(w => w.id === id);

  // Get data from navigation state or last completed workout
  const navState = location.state || {};
  const lastCompleted = state.completedWorkouts
    .filter(w => w.workoutId === id)
    .slice(-1)[0];
  const activeDuration = navState.activeDuration ?? lastCompleted?.activeDuration ?? 0;
  const wasPaused = navState.paused ?? lastCompleted?.paused ?? false;

  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    capture('wellparent_workout_completed', { workout_id: id, paused: wasPaused, actual_duration: activeDuration });
    // Generate confetti dots
    const dots = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 0.5}s`,
      color: ['#1C4A3E', '#7AAF96', '#9DB8AE', '#1A2420'][i % 4],
    }));
    setConfetti(dots);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center pt-12 pb-10 px-6 relative overflow-hidden">
      {/* Confetti */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        {confetti.map(dot => (
          <div
            key={dot.id}
            className="confetti-dot absolute w-2 h-2 rounded-full"
            style={{ left: dot.left, top: '-8px', backgroundColor: dot.color, animationDelay: dot.delay }}
          />
        ))}
      </div>

      {/* Animated checkmark */}
      <div className="mt-8 mb-6">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="32" fill="#1C4A3E" fillOpacity="0.1" />
          <circle cx="36" cy="36" r="32" fill="none" stroke="#1C4A3E" strokeWidth="2.5" />
          <path
            d="M22 36L32 46L50 28"
            stroke="#1C4A3E"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray="45"
            className="animate-checkmark"
          />
        </svg>
      </div>

      {/* Primary message */}
      <h1 className="font-playfair text-forest text-4xl font-bold italic text-center mb-2">
        You showed up.
      </h1>
      <p className="font-dm text-mist text-lg text-center mb-8">
        That's everything.
      </p>

      {/* Summary card */}
      <div className="w-full max-w-sm bg-white/70 rounded-2xl p-5 border border-mist/20 mb-6">
        <p className="font-dm text-mist text-xs uppercase tracking-widest mb-3">Workout Summary</p>
        <h2 className="font-playfair text-forest text-xl font-bold mb-1">
          {workout?.name || 'Workout'}
        </h2>
        <p className="font-dm text-ink text-base mb-2">
          Active time: <span className="font-semibold text-forest">{formatDuration(activeDuration)}</span>
        </p>
        {wasPaused && (
          <p className="font-dm text-mist text-sm italic">
            Including a pause. Life happened. You came back.
          </p>
        )}
      </div>

      {/* Streak */}
      {state.currentStreak > 0 && (
        <div className="flex items-center gap-2 mb-8">
          <span className="font-playfair text-forest text-2xl font-bold">{state.currentStreak}</span>
          <span className="font-dm text-forest text-base">-day streak 🔥</span>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3 w-full max-w-sm mt-auto">
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-forest text-cream font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Done
        </button>
        <button
          onClick={() => navigate('/reset')}
          className="w-full border-2 border-forest/30 text-forest font-dm font-medium text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Try The Reset
        </button>
      </div>
    </div>
  );
}
