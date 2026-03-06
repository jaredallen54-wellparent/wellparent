import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';

export default function ResetPauseScreen() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  useEffect(() => {
    capture('pause_screen_viewed', { workoutId: 'reset-001' });
  }, []);

  const handleResume = () => {
    capture('reset_resumed', { workoutId: 'reset-001' });
    navigate('/reset');
  };

  const handleStop = () => {
    dispatch({ type: 'ABANDON_WORKOUT' });
    navigate('/home');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-10 px-6"
      style={{ backgroundColor: '#F5EDE4' }}
    >
      {/* Wordmark */}
      <div className="pt-4">
        <span className="font-playfair text-ink text-lg font-bold">Well</span>
        <span className="font-playfair text-terra text-lg italic">Parent</span>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center text-center gap-8">
        {/* Breathing animation in terra */}
        <div className="relative flex items-center justify-center w-40 h-40">
          <div
            className="animate-breathe absolute w-32 h-32 rounded-full"
            style={{ backgroundColor: 'rgba(196, 98, 58, 0.08)' }}
          />
          <div
            className="animate-breathe absolute w-20 h-20 rounded-full"
            style={{ backgroundColor: 'rgba(196, 98, 58, 0.12)', animationDelay: '-2s' }}
          />
          <div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: 'rgba(196, 98, 58, 0.2)' }}
          />
        </div>

        <div>
          <h1 className="font-playfair text-ink text-4xl italic font-bold mb-4">
            Take your time.
          </h1>
          <p className="text-mist font-dm text-base leading-relaxed max-w-xs">
            The Reset will be here when you're ready.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-5 w-full max-w-sm">
        <button
          onClick={handleResume}
          className="w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform text-white"
          style={{ backgroundColor: '#C4623A' }}
        >
          Resume
        </button>
        <button
          onClick={handleStop}
          className="text-mist/60 font-dm text-sm min-h-[44px] px-4"
        >
          Stop Reset
        </button>
      </div>
    </div>
  );
}
