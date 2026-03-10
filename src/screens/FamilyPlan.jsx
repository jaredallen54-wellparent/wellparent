import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function FamilyPlan() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/settings')}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      <div className="px-5 flex flex-col gap-6">
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Phase 3 — Month 12+</p>
          <h1 className="font-playfair text-forest text-3xl font-bold mb-2">Family Plan</h1>
          <p className="font-dm text-mist text-base">
            Two people. One household. Shared support.
          </p>
        </div>

        <div className="bg-mist/10 rounded-2xl px-5 py-4">
          <p className="font-dm text-mist text-sm">
            <span className="font-semibold text-forest">Coming Month 12.</span> Design preview only.
          </p>
        </div>

        {/* Invite flow */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-4">Invite your partner</p>

          <div className="bg-cream/80 border border-mist/20 rounded-xl px-4 py-3 mb-4">
            <p className="font-dm text-mist text-sm">partner@email.com</p>
          </div>

          <button
            onClick={() => navigate('/subscribe')}
            className="w-full bg-forest text-cream font-dm font-semibold text-base rounded-full py-3.5 min-h-[52px] active:scale-95 transition-transform"
          >
            Send Invite
          </button>
        </div>

        {/* Shared dashboard preview */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-4">Shared Progress</p>
          <p className="font-dm text-ink text-sm mb-4">Optional — each person keeps their own data. This is a shared view you both opt into.</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'You', streak: '4 days', this_week: '2 of 3' },
              { name: 'Partner', streak: '—', this_week: '—' },
            ].map((person, i) => (
              <div key={i} className="bg-cream/80 rounded-xl p-4 text-center">
                <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">{person.name}</p>
                <p className="font-playfair text-forest text-xl font-bold">{person.streak}</p>
                <p className="font-dm text-mist text-xs mt-1">{person.this_week}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="font-dm text-mist text-xs text-center leading-relaxed">
          Streak encouragement is opt-in. Neither partner can see the other's details without consent.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
