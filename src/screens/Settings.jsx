import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { personas, commitmentOptions } from '../data/personas';
import BottomNav from '../components/BottomNav';

export default function Settings() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const personaLabel = personas.find(p => p.id === state.persona)?.label || 'Not set';
  const goalLabel = commitmentOptions.find(c => c.id === state.weeklyGoal)?.label || 'Not set';

  const handleResetData = () => {
    if (window.confirm('Reset all data? This cannot be undone.')) {
      dispatch({ type: 'RESET_DATA' });
      localStorage.removeItem('wellparent_state');
      navigate('/', { replace: true });
    }
  };

  const toggleEnergy = () => {
    dispatch({ type: 'SET_ENERGY_CHECKIN_ENABLED', payload: !state.energyCheckInEnabled });
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-6">
        <h1 className="font-playfair text-forest text-3xl font-bold">Settings</h1>
      </div>

      <div className="px-5 flex flex-col gap-4">
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="#9DB8AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          <button
            onClick={() => navigate('/onboarding/commitment')}
            className="w-full flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10 active:bg-mist/10 transition-colors"
          >
            <span className="font-dm text-ink text-base">Weekly goal</span>
            <div className="flex items-center gap-2">
              <span className="font-dm text-mist text-sm">{goalLabel}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="#9DB8AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Preferences */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 overflow-hidden">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold px-5 pt-4 pb-2">Preferences</p>

          <div className="flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10">
            <div>
              <p className="font-dm text-ink text-base">One-Hand Mode</p>
              <p className="font-dm text-mist text-xs">Shifts nav to thumb zone</p>
            </div>
            <div className="w-11 h-6 bg-mist/30 rounded-full relative cursor-pointer" onClick={() => {}}>
              <div className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5 left-0.5 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-3.5 min-h-[52px] border-t border-mist/10">
            <div>
              <p className="font-dm text-ink text-base">Energy Check-In</p>
              <p className="font-dm text-mist text-xs">Daily energy prompt on Home</p>
            </div>
            <button
              onClick={toggleEnergy}
              className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${
                state.energyCheckInEnabled ? 'bg-forest' : 'bg-mist/30'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform duration-200 ${
                  state.energyCheckInEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">About</p>
          <p className="font-dm text-mist text-sm">Version 0.1 MVP</p>
          <p className="font-dm text-mist text-sm mt-1 leading-relaxed italic">
            WellParent is in early access. Thank you for testing.
          </p>
        </div>

        {/* Reset Data */}
        <div className="flex justify-center pt-2 pb-4">
          <button
            onClick={handleResetData}
            className="font-dm text-mist text-sm min-h-[44px] px-4"
          >
            Reset Data
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
