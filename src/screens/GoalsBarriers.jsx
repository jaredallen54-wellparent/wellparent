import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';

const GOALS = [
  { id: 'stress', label: 'Reduce stress' },
  { id: 'strength', label: 'Build strength' },
  { id: 'sleep', label: 'Improve sleep' },
  { id: 'energy', label: 'More energy' },
  { id: 'postpartum', label: 'Postpartum recovery' },
  { id: 'myself', label: 'Just feel like myself again' },
];

export default function GoalsBarriers() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(g => g !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  };

  const handleContinue = () => {
    dispatch({ type: 'SET_GOALS', payload: selected });
    capture('goals_selected', { goals: selected });
    navigate('/onboarding/equipment');
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-mist/30">
        <div className="h-full bg-forest transition-all duration-500 rounded-full" style={{ width: '50%' }} />
      </div>

      <div className="flex-1 flex flex-col px-5 pt-8 pb-6">
        <p className="font-dm text-mist text-xs uppercase tracking-widest mb-6">Step 2 of 4</p>

        <h1 className="font-playfair text-forest text-3xl font-bold leading-tight mb-3">
          What matters most right now?
        </h1>
        <p className="font-dm text-mist text-base leading-relaxed mb-2">
          Pick the ones that feel true today.
        </p>
        <p className="font-dm text-mist text-sm italic mb-8">
          Up to 3 — you can always change these.
        </p>

        <div className="flex flex-col gap-3 flex-1">
          {GOALS.map(goal => {
            const isSelected = selected.includes(goal.id);
            const isDisabled = !isSelected && selected.length >= 3;
            return (
              <button
                key={goal.id}
                onClick={() => toggle(goal.id)}
                disabled={isDisabled}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-200 min-h-[60px] text-left ${
                  isSelected
                    ? 'border-forest bg-forest/5'
                    : isDisabled
                    ? 'border-mist/15 bg-white/30 opacity-50'
                    : 'border-mist/30 bg-white/60'
                }`}
              >
                <p className={`font-dm font-medium text-base ${isSelected ? 'text-forest' : 'text-ink'}`}>
                  {goal.label}
                </p>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="px-5 pb-8">
        <button
          onClick={handleContinue}
          className="w-full bg-forest text-cream font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          {selected.length > 0 ? 'Continue' : 'Skip for now'}
        </button>
      </div>
    </div>
  );
}
