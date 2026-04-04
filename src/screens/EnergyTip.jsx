import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { energyTips } from '../data/nutritionData';

export default function EnergyTip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tip = energyTips.find(t => t.id === id);
  const currentIndex = energyTips.findIndex(t => t.id === id);
  const nextTip = energyTips[(currentIndex + 1) % energyTips.length];

  useEffect(() => {
    if (!tip) return;
    capture('energy_tip_viewed', { tip_id: id, tip_title: tip.title });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!tip) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-dm text-mist">Tip not found.</p>
      </div>
    );
  }

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
        {/* Emoji + Title */}
        <div>
          <span className="text-4xl mb-4 block">{tip.emoji}</span>
          <h1 className="font-playfair text-forest text-3xl font-bold leading-tight">
            {tip.title}
          </h1>
        </div>

        {/* Body */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-6">
          <p className="font-dm text-ink text-lg leading-relaxed">
            {tip.body}
          </p>
        </div>

        {/* Action */}
        <div
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: 'rgba(28,74,62,0.04)', borderColor: 'rgba(28,74,62,0.15)' }}
        >
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">
            One thing to try
          </p>
          <p className="font-dm text-forest text-base leading-relaxed font-medium">
            {tip.action}
          </p>
        </div>

        {/* Next tip */}
        <button
          onClick={() => navigate(`/nutrition/energy-tip/${nextTip.id}`)}
          className="w-full bg-white/70 border border-mist/20 rounded-2xl p-5 text-left active:scale-[0.98] transition-transform"
        >
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Up next</p>
          <div className="flex items-center gap-3">
            <span className="text-xl">{nextTip.emoji}</span>
            <p className="font-playfair text-forest text-base font-bold flex-1">{nextTip.title}</p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
              <path d="M7 4L13 10L7 16" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

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
