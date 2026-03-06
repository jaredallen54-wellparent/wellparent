import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';

export default function PauseScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  useEffect(() => {
    capture('pause_screen_viewed', { workoutId: id });
  }, [id]);

  const handleResume = () => {
    capture('workout_resumed', { workoutId: id });
    navigate(`/workout/${id}`);
  };

  const handleEnd = () => {
    dispatch({ type: 'ABANDON_WORKOUT' });
    capture('workout_abandoned', { workoutId: id });
    navigate('/home');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-10 px-6"
      style={{ backgroundColor: '#2A6B5A' }}
    >
      {/* Wordmark */}
      <div className="pt-4">
        <span className="font-playfair text-cream text-lg font-bold">Well</span>
        <span className="font-playfair text-cream/70 text-lg italic">Parent</span>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center text-center gap-8">
        {/* Breathing animation */}
        <div className="relative flex items-center justify-center w-40 h-40">
          <div
            className="animate-breathe absolute w-32 h-32 rounded-full"
            style={{ backgroundColor: 'rgba(250, 247, 242, 0.08)' }}
          />
          <div
            className="animate-breathe absolute w-20 h-20 rounded-full"
            style={{ backgroundColor: 'rgba(250, 247, 242, 0.12)', animationDelay: '-2s' }}
          />
          <div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: 'rgba(250, 247, 242, 0.2)' }}
          />
        </div>

        <div>
          <h1 className="font-playfair text-cream text-4xl italic font-bold mb-4">
            Life got full.
          </h1>
          <p className="text-cream/70 font-dm text-base leading-relaxed max-w-xs">
            That's allowed. Your workout is right where you left it.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-5 w-full max-w-sm">
        <button
          onClick={handleResume}
          className="w-full bg-cream text-forest font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Resume
        </button>
        <button
          onClick={handleEnd}
          className="text-cream/40 font-dm text-sm min-h-[44px] px-4"
        >
          End Workout
        </button>
      </div>
    </div>
  );
}
