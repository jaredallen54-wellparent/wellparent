import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';

export default function ReEngagement() {
  const navigate = useNavigate();

  const handleReset = () => {
    capture('re_engagement_reset_tapped');
    navigate('/reset');
  };

  const handleHome = () => {
    capture('re_engagement_home_tapped');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-between px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, #FAF7F2 0%, transparent 60%), radial-gradient(circle at 70% 80%, #7AAF96 0%, transparent 50%)'
        }}
      />

      <div className="relative z-10">
        <span className="font-playfair text-cream text-xl font-bold">Well</span>
        <span className="font-playfair text-white/50 text-xl italic">Parent</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 relative z-10 max-w-sm">
        <div>
          <h1 className="font-playfair text-cream text-4xl font-bold italic leading-tight mb-4">
            Life got full.<br />That's allowed.
          </h1>
          <p className="font-dm text-cream/70 text-lg leading-relaxed">
            Your Reset is ready. Nothing to catch up on. No missed days shown. Just here.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm relative z-10">
        <button
          onClick={handleReset}
          className="w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform text-white"
          style={{ backgroundColor: '#C4623A' }}
        >
          Start The Reset — 5 min
        </button>
        <button
          onClick={handleHome}
          className="w-full border-2 border-cream/30 text-cream font-dm font-medium text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Take me home
        </button>
      </div>
    </div>
  );
}
