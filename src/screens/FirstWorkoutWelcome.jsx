import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';

export default function FirstWorkoutWelcome() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  useEffect(() => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    capture('wellparent_onboarding_completed', {
      persona: state.persona,
      commitment_goal: state.weeklyGoal,
      equipment: state.equipment,
      postpartum_flag: state.postpartumMode,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-between px-6 py-16 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, #FAF7F2 0%, transparent 60%), radial-gradient(circle at 70% 80%, #7AAF96 0%, transparent 50%)'
        }}
      />

      {/* Top */}
      <div className="relative z-10 text-center">
        <span className="font-playfair text-cream text-2xl font-bold tracking-tight">Well</span>
        <span className="font-playfair text-white/60 text-2xl italic tracking-tight">Parent</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 relative z-10 max-w-sm">
        <div>
          <p className="font-dm text-sage text-sm uppercase tracking-widest font-semibold mb-4">
            You're all set
          </p>
          <h1 className="font-playfair text-cream text-4xl font-bold leading-tight mb-4">
            Good to meet you.
          </h1>
          <p className="font-dm text-cream/70 text-lg leading-relaxed">
            Your plan is set. Your workouts are ready. Let's start with something small.
          </p>
        </div>

        {/* The Reset highlight */}
        <div
          className="w-full rounded-2xl p-5 text-left"
          style={{ backgroundColor: 'rgba(196,98,58,0.15)', border: '1px solid rgba(196,98,58,0.4)' }}
        >
          <p className="font-dm text-white/60 text-xs uppercase tracking-widest font-semibold mb-2">
            Meet The Reset
          </p>
          <h2 className="font-playfair text-white text-2xl font-bold italic mb-2">
            5 minutes. Always free.
          </h2>
          <p className="font-dm text-white/70 text-sm leading-relaxed">
            The Reset is always here — on your worst days, when the baby won't sleep, when you have literally nothing left. 5 minutes is enough.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 w-full max-w-sm relative z-10">
        <button
          onClick={() => navigate('/reset')}
          className="w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform text-white"
          style={{ backgroundColor: '#C4623A' }}
        >
          Start with a Reset
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full border-2 border-cream/30 text-cream font-dm font-medium text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Show me today's workout
        </button>
      </div>
    </div>
  );
}
