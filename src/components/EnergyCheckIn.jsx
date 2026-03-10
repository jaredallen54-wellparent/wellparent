import { useApp, capture } from '../context/AppContext';

const options = [
  { value: 'low', emoji: '😴', label: 'Low' },
  { value: 'medium', emoji: '⚡', label: 'Medium' },
  { value: 'high', emoji: '🔥', label: 'High' },
];

export default function EnergyCheckIn() {
  const { dispatch } = useApp();

  const handleSelect = (value) => {
    dispatch({ type: 'SET_ENERGY', payload: value });
    capture('wellparent_energy_checkin', { energy_level: value });
  };

  return (
    <div className="bg-white/60 rounded-2xl p-5 mb-4">
      <p className="font-dm text-ink font-medium text-base mb-4">How's your energy today?</p>
      <div className="flex gap-3">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 border-mist/30 bg-cream active:scale-95 transition-all duration-150 min-h-[72px]"
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="font-dm text-mist text-xs font-medium">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
