import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { personas, commitmentOptions } from '../data/personas';
import BottomNav from '../components/BottomNav';

const GOAL_LABELS = {
  stress: 'Reduce stress',
  strength: 'Build strength',
  sleep: 'Improve sleep',
  energy: 'More energy',
  postpartum: 'Postpartum recovery',
  myself: 'Just feel like myself again',
};

const INJURY_OPTIONS = [
  { id: 'back', label: 'Low back' },
  { id: 'knees', label: 'Knees' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'wrists', label: 'Wrists' },
  { id: 'hips', label: 'Hip flexors' },
];

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${
        value ? 'bg-forest' : 'bg-mist/30'
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform duration-200 ${
          value ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3L11 8L6 13" stroke="#9DB8AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const personaLabel = personas.find(p => p.id === state.persona)?.label || 'Not set';
  const goalLabel = commitmentOptions.find(c => c.id === state.weeklyGoal)?.label || 'Not set';
  const goalsLabel = state.goals?.length
    ? state.goals.map(g => GOAL_LABELS[g]).filter(Boolean).join(', ')
    : 'Not set';
  const equipmentLabel = state.equipment?.length
    ? state.equipment.join(', ')
    : 'Bodyweight';

  const handleResetData = () => {
    if (window.confirm('Reset all data? This cannot be undone.')) {
      dispatch({ type: 'RESET_DATA' });
      localStorage.removeItem('wellparent_state');
      navigate('/', { replace: true });
    }
  };

  const toggleInjury = (id) => {
    const current = state.injuryFlags || [];
    const updated = current.includes(id)
      ? current.filter(i => i !== id)
      : [...current, id];
    dispatch({ type: 'SET_INJURY_FLAGS', payload: updated });
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-6">
        <h1 className="font-playfair text-forest text-3xl font-bold">You</h1>
      </div>

      <div className="px-5 flex flex-col gap-4">

        {/* Subscription */}
        <button
          onClick={() => navigate('/subscribe')}
          className="w-full flex items-center justify-between bg-forest rounded-2xl px-5 py-4 min-h-[64px] active:scale-[0.98] transition-transform"
        >
          <div>
            <p className="font-dm text-cream/70 text-xs uppercase tracking-widest font-semibold mb-0.5">Subscription</p>
            <p className="font-dm text-cream font-semibold text-base">Free tier — Upgrade to Premium</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L13 10L7 16" stroke="rgba(250,247,242,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Profile */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 overflow-hidden">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold px-5 pt-4 pb-2">Profile</p>

          <button
            onClick={() => navigate('/onboarding/persona')}
            className="w-full flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10 active:bg-mist/10 transition-colors"
          >
            <span className="font-dm text-ink text-base">Persona</span>
            <div className="flex items-center gap-2">
              <span className="font-dm text-mist text-sm">{personaLabel}</span>
              <ChevronRight />
            </div>
          </button>

          <button
            onClick={() => navigate('/onboarding/commitment')}
            className="w-full flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10 active:bg-mist/10 transition-colors"
          >
            <span className="font-dm text-ink text-base">Weekly goal</span>
            <div className="flex items-center gap-2">
              <span className="font-dm text-mist text-sm">{goalLabel}</span>
              <ChevronRight />
            </div>
          </button>

          <button
            onClick={() => navigate('/onboarding/goals')}
            className="w-full flex items-start justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10 active:bg-mist/10 transition-colors"
          >
            <span className="font-dm text-ink text-base">My goals</span>
            <div className="flex items-center gap-2 max-w-[60%]">
              <span className="font-dm text-mist text-sm text-right truncate">{goalsLabel}</span>
              <ChevronRight />
            </div>
          </button>

          <button
            onClick={() => navigate('/onboarding/equipment')}
            className="w-full flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10 active:bg-mist/10 transition-colors"
          >
            <span className="font-dm text-ink text-base">Equipment</span>
            <div className="flex items-center gap-2">
              <span className="font-dm text-mist text-sm capitalize">{equipmentLabel}</span>
              <ChevronRight />
            </div>
          </button>
        </div>

        {/* Safety */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 overflow-hidden">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold px-5 pt-4 pb-2">Safety</p>

          <div className="flex items-center justify-between px-5 py-3.5 min-h-[56px] border-t border-mist/10">
            <div>
              <p className="font-dm text-ink text-base">Postpartum Mode</p>
              <p className="font-dm text-mist text-xs mt-0.5">Safety guidance on relevant exercises</p>
            </div>
            <Toggle
              value={state.postpartumMode || false}
              onChange={val => dispatch({ type: 'SET_POSTPARTUM_MODE', payload: val })}
            />
          </div>

          {/* Injury flags */}
          <div className="px-5 py-4 border-t border-mist/10">
            <p className="font-dm text-ink text-base mb-3">Areas to work around</p>
            <div className="flex flex-wrap gap-2">
              {INJURY_OPTIONS.map(opt => {
                const isSelected = (state.injuryFlags || []).includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleInjury(opt.id)}
                    className={`px-4 py-2 rounded-full border-2 font-dm text-sm font-medium transition-all duration-200 min-h-[44px] ${
                      isSelected
                        ? 'border-forest bg-forest/5 text-forest'
                        : 'border-mist/30 bg-white text-ink'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 overflow-hidden">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold px-5 pt-4 pb-2">Preferences</p>

          <div className="flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10">
            <div>
              <p className="font-dm text-ink text-base">One-Hand Mode</p>
              <p className="font-dm text-mist text-xs">Larger tap targets throughout</p>
            </div>
            <Toggle
              value={state.oneHandMode || false}
              onChange={val => dispatch({ type: 'SET_ONE_HAND_MODE', payload: val })}
            />
          </div>

          <div className="flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10">
            <div>
              <p className="font-dm text-ink text-base">Energy Check-In</p>
              <p className="font-dm text-mist text-xs">Daily energy prompt on Home</p>
            </div>
            <Toggle
              value={state.energyCheckInEnabled}
              onChange={val => dispatch({ type: 'SET_ENERGY_CHECKIN_ENABLED', payload: val })}
            />
          </div>

          <button
            onClick={() => navigate('/reminders')}
            className="w-full flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10 active:bg-mist/10 transition-colors"
          >
            <span className="font-dm text-ink text-base">Smart Reminders</span>
            <ChevronRight />
          </button>
        </div>

        {/* What's coming */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 overflow-hidden">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold px-5 pt-4 pb-2">Coming Soon</p>
          {[
            { label: 'AI Coach', path: '/coach' },
            { label: 'Book a Coach Session', path: '/book-coach' },
            { label: 'Education Hub', path: '/education' },
            { label: 'Family Plan', path: '/family-plan' },
            { label: 'Wearable Connection', path: '/wearable' },
            { label: 'Community', path: '/community' },
          ].map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10 active:bg-mist/10 transition-colors"
            >
              <span className="font-dm text-ink text-base">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-dm text-mist text-xs bg-mist/15 px-2 py-0.5 rounded-full">Preview</span>
                <ChevronRight />
              </div>
            </button>
          ))}
        </div>

        {/* About */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">About</p>
          <p className="font-dm text-mist text-sm">Version 0.2 Prototype</p>
          <p className="font-dm text-mist text-sm mt-1 leading-relaxed italic">
            WellParent is in early access. Thank you for building this with us.
          </p>
        </div>

        {/* Reset Data */}
        <div className="flex justify-center pt-2 pb-4">
          <button
            onClick={handleResetData}
            className="font-dm text-mist text-sm min-h-[44px] px-4"
          >
            Reset all data
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
