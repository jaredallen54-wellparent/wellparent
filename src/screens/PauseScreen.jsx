import { useParams, useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';

export default function PauseScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();

  // Note: wellparent_workout_paused is fired by WorkoutPlayer on long-press complete.
  // Resume event is fired by WorkoutPlayer on remount (isResuming path).

  const handleResume = () => {
    // Don't dispatch RESUME_WORKOUT here — WorkoutPlayer's init effect handles it on mount.
    navigate(`/workout/${id}`);
  };

  const handleEnd = () => {
    dispatch({ type: 'ABANDON_WORKOUT' });
    capture('wellparent_workout_abandoned', { workout_id: id });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 py-16">
      <h1 className="font-playfair text-cream text-4xl font-bold italic text-center mb-16">
        Paused. Take your time.
      </h1>

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
