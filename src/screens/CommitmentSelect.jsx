import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { commitmentOptions } from '../data/personas';

export default function CommitmentSelect() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [selected, setSelected] = useState(null);

  const handleGo = () => {
    if (!selected) return;
    dispatch({ type: 'SET_WEEKLY_GOAL', payload: selected });
    capture('commitment_set', { goal: selected });
    navigate('/onboarding/welcome');
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-mist/30">
        <div className="h-full bg-forest transition-all duration-500 rounded-full" style={{ width: '100%' }} />
      </div>

      <div className="flex-1 flex flex-col px-5 pt-8 pb-6">
        <p className="font-dm text-mist text-xs uppercase tracking-widest mb-6">Step 4 of 4</p>

        <h1 className="font-playfair text-forest text-3xl font-bold leading-tight mb-3">
          How many times a week feels realistic right now?
        </h1>
        <p className="font-dm text-mist text-base leading-relaxed mb-8">
          There's no wrong answer. This is your plan, not a target to judge yourself against.
        </p>

        {/* Commitment cards */}
        <div className="flex flex-col gap-3 flex-1">
          {commitmentOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 min-h-[80px] text-left ${
                selected === opt.id
                  ? 'border-forest bg-forest/5'
                  : 'border-mist/30 bg-white/60'
              }`}
            >
              <div>
                <p className={`font-playfair font-bold text-xl italic ${selected === opt.id ? 'text-forest' : 'text-ink'}`}>
                  {opt.label}
                </p>
                <p className="font-dm text-mist text-sm mt-0.5">{opt.sub}</p>
              </div>
              {selected === opt.id && (
                <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <p className="font-dm text-mist text-sm text-center mt-5">
          No judgment if life gets in the way.
        </p>
      </div>

      {/* Sticky CTA */}
      <div className="px-5 pb-8">
        <button
          onClick={handleGo}
          disabled={!selected}
          className={`w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] transition-all duration-200 ${
            selected
              ? 'bg-forest text-cream active:scale-95'
              : 'bg-mist/30 text-mist cursor-not-allowed'
          }`}
        >
          This is my plan
        </button>
      </div>
    </div>
  );
}
