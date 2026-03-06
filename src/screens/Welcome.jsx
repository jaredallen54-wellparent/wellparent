import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';

export default function Welcome() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    capture('app_opened');
    if (state.onboardingComplete) {
      navigate('/home', { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignIn = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-between px-6 py-16 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, #FAF7F2 0%, transparent 60%), radial-gradient(circle at 70% 80%, #7AAF96 0%, transparent 50%)'
        }}
      />

      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 relative z-10">
        {/* Wordmark */}
        <div>
          <span className="font-playfair text-cream text-5xl font-bold tracking-tight">Well</span>
          <span className="font-playfair text-terra text-5xl font-bold italic tracking-tight">Parent</span>
        </div>

        <p className="font-dm text-cream/80 text-lg leading-relaxed max-w-xs">
          Fitness that fits into your life —<br />
          not the other way around.
        </p>

        {/* Leaf/nature decorative element */}
        <div className="text-sage/40 text-4xl mt-2">🌿</div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 w-full max-w-sm relative z-10">
        <button
          onClick={() => navigate('/onboarding/persona')}
          className="w-full bg-cream text-forest font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Get Started
        </button>
        <button
          onClick={handleSignIn}
          className="w-full border-2 border-cream/30 text-cream font-dm font-medium text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Sign In
        </button>
        <p className="text-center text-cream/40 font-dm text-sm mt-2">
          No streak guilt. No perfect schedule required.
        </p>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-ink/90 text-cream font-dm text-sm px-5 py-3 rounded-full shadow-lg z-50">
          Coming soon
        </div>
      )}
    </div>
  );
}
