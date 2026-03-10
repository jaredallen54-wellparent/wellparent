import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { personas } from '../data/personas';

export default function PersonaSelect() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;
    dispatch({ type: 'SET_PERSONA', payload: selected });
    capture('persona_selected', { persona: selected });
    navigate('/onboarding/goals');
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-mist/30">
        <div className="h-full bg-forest transition-all duration-500 rounded-full" style={{ width: '25%' }} />
      </div>

      <div className="flex-1 flex flex-col px-5 pt-8 pb-6">
        <p className="font-dm text-mist text-xs uppercase tracking-widest mb-6">Step 1 of 4</p>

        <h1 className="font-playfair text-forest text-3xl font-bold leading-tight mb-3">
          Who are you showing up for?
        </h1>
        <p className="font-dm text-mist text-base leading-relaxed mb-8">
          This shapes your workouts and how the app speaks to you.
        </p>

        {/* Persona cards */}
        <div className="flex flex-col gap-3 flex-1">
          {personas.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 min-h-[72px] text-left ${
                selected === p.id
                  ? 'border-forest bg-forest/5'
                  : 'border-mist/30 bg-white/60'
              }`}
            >
              <span className="text-3xl flex-shrink-0">{p.emoji}</span>
              <div className="flex-1">
                <p className={`font-dm font-semibold text-base ${selected === p.id ? 'text-forest' : 'text-ink'}`}>
                  {p.label}
                </p>
                <p className="font-dm text-mist text-sm mt-0.5">{p.desc}</p>
              </div>
              {selected === p.id && (
                <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="px-5 pb-8">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] transition-all duration-200 ${
            selected
              ? 'bg-forest text-cream active:scale-95'
              : 'bg-mist/30 text-mist cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
