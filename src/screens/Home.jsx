import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { workouts } from '../data/workouts';
import EnergyCheckIn from '../components/EnergyCheckIn';
import BottomNav from '../components/BottomNav';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Home() {
  const navigate = useNavigate();
  const { state } = useApp();

  useEffect(() => {
    capture('home_viewed');
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const showEnergyCheckIn =
    state.energyCheckInEnabled &&
    state.energyDate !== today &&
    state.completedWorkouts.length > 0;

  const featuredWorkout = workouts[0];

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <p className="font-dm text-mist text-sm mb-1">
          {getGreeting()} —
        </p>
        <h1 className="font-playfair text-forest text-2xl font-bold">
          You're here.
        </h1>
      </div>

      <div className="px-5 flex flex-col gap-4">
        {/* Resume banner — shown if there's a paused workout */}
        {state.activeWorkout && state.activeWorkout.pausedAt && !state.activeWorkout.isReset && (
          <div className="bg-forest rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="font-dm text-cream font-semibold text-sm">Workout paused</p>
              <p className="font-dm text-mist text-xs mt-0.5">Resume where you left off</p>
            </div>
            <button
              onClick={() => navigate(`/workout/${state.activeWorkout.workoutId}`)}
              className="font-dm font-semibold text-sage text-sm min-h-[48px] px-3"
            >
              Resume →
            </button>
          </div>
        )}
        {state.activeWorkout && state.activeWorkout.pausedAt && state.activeWorkout.isReset && (
          <div className="rounded-2xl p-4 flex items-center justify-between border-2" style={{ borderColor: '#C4623A', backgroundColor: 'rgba(196,98,58,0.06)' }}>
            <div>
              <p className="font-dm font-semibold text-sm" style={{ color: '#C4623A' }}>Reset paused</p>
              <p className="font-dm text-mist text-xs mt-0.5">Pick up where you left off</p>
            </div>
            <button
              onClick={() => navigate('/reset')}
              className="font-dm font-semibold text-sm min-h-[48px] px-3"
              style={{ color: '#C4623A' }}
            >
              Resume →
            </button>
          </div>
        )}

        {/* Energy check-in (once per day, after first workout) */}
        {showEnergyCheckIn && <EnergyCheckIn />}

        {/* The Reset card */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-3"
          style={{ backgroundColor: '#C4623A' }}
        >
          <div>
            <p className="font-dm text-white/70 text-xs uppercase tracking-widest font-semibold mb-1">
              Today's Reset
            </p>
            <h2 className="font-playfair text-white text-2xl font-bold italic">
              The Reset
            </h2>
            <p className="font-dm text-white/80 text-sm mt-1">
              5 minutes. That's a win.
            </p>
          </div>
          <button
            onClick={() => navigate('/reset')}
            className="self-start bg-white/20 text-white font-dm font-semibold text-sm rounded-full px-6 py-2.5 min-h-[44px] active:scale-95 transition-transform border border-white/30"
          >
            Start Now
          </button>
        </div>

        {/* Today's Workout */}
        <div className="bg-white/70 rounded-2xl p-5 border border-mist/20">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Today's Workout
          </p>
          <h2 className="font-playfair text-forest text-xl font-bold mb-1">
            {featuredWorkout.name}
          </h2>
          <p className="font-dm text-mist text-sm italic mb-3">{featuredWorkout.tag}</p>
          <div className="flex gap-2 mb-4">
            <span className="bg-forest/10 text-forest font-dm text-xs font-medium px-3 py-1 rounded-full">
              {featuredWorkout.duration} min
            </span>
            <span className="bg-mist/20 text-mist font-dm text-xs font-medium px-3 py-1 rounded-full">
              {featuredWorkout.level}
            </span>
          </div>
          <button
            onClick={() => navigate(`/workout/${featuredWorkout.id}`)}
            className="w-full bg-forest text-cream font-dm font-semibold text-base rounded-full py-3.5 min-h-[52px] active:scale-95 transition-transform"
          >
            Start Workout
          </button>
        </div>

        {/* Quick access to all workouts */}
        <button
          onClick={() => navigate('/workouts')}
          className="w-full text-center font-dm text-forest text-sm font-medium py-3 min-h-[44px]"
        >
          Browse all workouts →
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
