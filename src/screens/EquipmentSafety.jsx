import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';

const EQUIPMENT_OPTIONS = [
  { id: 'bodyweight', label: 'Bodyweight only', desc: 'No equipment needed' },
  { id: 'dumbbells', label: 'Dumbbells', desc: 'Light to moderate weights' },
  { id: 'bands', label: 'Resistance bands', desc: 'Any resistance level' },
  { id: 'gym', label: 'Full gym access', desc: 'Machines and free weights' },
];

const INJURY_OPTIONS = [
  { id: 'back', label: 'Low back' },
  { id: 'knees', label: 'Knees' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'wrists', label: 'Wrists' },
  { id: 'hips', label: 'Hip flexors' },
];

export default function EquipmentSafety() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [postpartum, setPostpartum] = useState(false);
  const [injuries, setInjuries] = useState([]);

  const toggleEquipment = (id) => {
    setSelectedEquipment(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const toggleInjury = (id) => {
    setInjuries(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    dispatch({ type: 'SET_EQUIPMENT', payload: selectedEquipment });
    dispatch({ type: 'SET_POSTPARTUM_MODE', payload: postpartum });
    dispatch({ type: 'SET_INJURY_FLAGS', payload: injuries });
    capture('equipment_set', { equipment: selectedEquipment, postpartum, injuries });
    navigate('/onboarding/commitment');
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-mist/30">
        <div className="h-full bg-forest transition-all duration-500 rounded-full" style={{ width: '75%' }} />
      </div>

      <div className="flex-1 flex flex-col px-5 pt-8 pb-6 overflow-y-auto">
        <p className="font-dm text-mist text-xs uppercase tracking-widest mb-6">Step 3 of 4</p>

        <h1 className="font-playfair text-forest text-3xl font-bold leading-tight mb-3">
          What do you have access to?
        </h1>
        <p className="font-dm text-mist text-base leading-relaxed mb-8">
          Pick all that apply. We'll match your workouts accordingly.
        </p>

        {/* Equipment */}
        <div className="flex flex-col gap-2 mb-8">
          {EQUIPMENT_OPTIONS.map(opt => {
            const isSelected = selectedEquipment.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleEquipment(opt.id)}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-200 min-h-[64px] text-left ${
                  isSelected ? 'border-forest bg-forest/5' : 'border-mist/30 bg-white/60'
                }`}
              >
                <div>
                  <p className={`font-dm font-medium text-base ${isSelected ? 'text-forest' : 'text-ink'}`}>
                    {opt.label}
                  </p>
                  <p className="font-dm text-mist text-xs mt-0.5">{opt.desc}</p>
                </div>
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

        {/* Postpartum toggle */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="font-dm font-semibold text-ink text-base mb-1">
                Are you in postpartum recovery?
              </p>
              <p className="font-dm text-mist text-sm leading-relaxed">
                We'll apply safety guidance to relevant exercises and use postpartum-appropriate copy throughout.
              </p>
            </div>
            <button
              onClick={() => setPostpartum(p => !p)}
              className={`w-12 h-7 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
                postpartum ? 'bg-forest' : 'bg-mist/30'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow absolute top-1 transition-transform duration-200 ${
                  postpartum ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Injury flags */}
        <div>
          <p className="font-dm text-mist text-sm font-semibold uppercase tracking-widest mb-3">
            Any areas to work around? (optional)
          </p>
          <div className="flex flex-wrap gap-2">
            {INJURY_OPTIONS.map(opt => {
              const isSelected = injuries.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleInjury(opt.id)}
                  className={`px-4 py-2 rounded-full border-2 font-dm text-sm font-medium transition-all duration-200 min-h-[44px] ${
                    isSelected
                      ? 'border-forest bg-forest/5 text-forest'
                      : 'border-mist/30 bg-white/60 text-ink'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="px-5 pb-8 pt-4 bg-cream/80 backdrop-blur-sm">
        <button
          onClick={handleContinue}
          className="w-full bg-forest text-cream font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
