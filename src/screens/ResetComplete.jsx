import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';

export default function ResetComplete() {
  const navigate = useNavigate();

  useEffect(() => {
    // reset_completed is fired by ResetPlayer on completion
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-between px-6 py-16">
      <div />

      <div className="flex flex-col items-center text-center gap-4">
        {/* Accent mark */}
        <div
          className="w-16 h-1.5 rounded-full mb-4"
          style={{ backgroundColor: '#C4623A' }}
        />

        <h1
          className="font-playfair text-5xl font-bold italic"
          style={{ color: '#C4623A' }}
        >
          5 minutes.
        </h1>
        <p className="font-dm text-ink text-xl leading-relaxed">
          That's a win.<br />That counts.
        </p>

        <div
          className="w-16 h-1.5 rounded-full mt-4"
          style={{ backgroundColor: '#C4623A', opacity: 0.3 }}
        />
      </div>

      <button
        onClick={() => navigate('/home')}
        className="w-full max-w-sm bg-forest text-cream font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
      >
        Back Home
      </button>
    </div>
  );
}
