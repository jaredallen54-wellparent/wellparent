import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { hydrationData } from '../data/nutritionData';

export default function HydrationPrompt() {
  const navigate = useNavigate();

  useEffect(() => {
    capture('hydration_guide_viewed');
  }, []);

  return (
    <div className="min-h-screen bg-cream pb-8">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/nutrition')}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Fuel
        </button>
      </div>

      <div className="px-5 flex flex-col gap-6">
        {/* Hero */}
        <div>
          <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center mb-4">
            <span className="text-3xl">💧</span>
          </div>
          <h1 className="font-playfair text-forest text-3xl font-bold mb-2">Water Guide</h1>
          <p className="font-dm text-mist text-base italic leading-relaxed">
            Dehydration looks like fatigue, brain fog, and headaches — all things parents already have enough of.
          </p>
        </div>

        {/* Daily checkpoints */}
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Four checkpoints
          </p>
          <div className="flex flex-col gap-3">
            {hydrationData.reminders.map((reminder, i) => (
              <div key={i} className="bg-white/70 rounded-2xl border border-mist/20 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-dm text-sage font-bold text-sm">{reminder.time.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="font-dm text-forest font-semibold text-base">{reminder.time}</p>
                    <p className="font-dm text-mist text-sm italic mb-1">{reminder.cue}</p>
                    <p className="font-dm text-ink text-sm leading-relaxed">{reminder.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            What helps
          </p>
          <div className="flex flex-col gap-2">
            {hydrationData.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/70 rounded-xl border border-mist/15 px-4 py-3.5">
                <div className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0 mt-2" />
                <p className="font-dm text-ink text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/nutrition')}
          className="w-full bg-forest text-cream font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Back to Fuel
        </button>
      </div>
    </div>
  );
}
