import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const TRAINERS = [
  {
    name: 'Dr. Sarah Chen',
    specialty: 'Postpartum recovery specialist',
    cert: 'CSCS, Pelvic Floor certified',
    rating: '4.9',
    slots: ['Tue 10am', 'Thu 2pm', 'Sat 9am'],
  },
  {
    name: 'Marcus Williams',
    specialty: 'Parent strength & conditioning',
    cert: 'NASM-CPT, Pre/Postnatal specialist',
    rating: '4.8',
    slots: ['Mon 6pm', 'Wed 7am', 'Fri 5pm'],
  },
  {
    name: 'Priya Sharma',
    specialty: 'Mobility & stress recovery',
    cert: 'RYT-200, FMS certified',
    rating: '5.0',
    slots: ['Tue 7pm', 'Thu 8am'],
  },
];

export default function CoachBooking() {
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
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Phase 3 — Month 9+</p>
          <h1 className="font-playfair text-forest text-3xl font-bold mb-2">Book a Coach</h1>
          <p className="font-dm text-mist text-base">
            10–15 minute live sessions with parent-specialist trainers. Premium add-on.
          </p>
        </div>

        {/* Coming soon */}
        <div className="bg-mist/10 rounded-2xl px-5 py-4">
          <p className="font-dm text-mist text-sm">
            <span className="font-semibold text-forest">Coming Month 9.</span> Book sessions are not yet live — this is a design preview.
          </p>
        </div>

        {/* Trainer cards */}
        {TRAINERS.map((t, i) => (
          <div key={i} className="bg-white/70 rounded-2xl border border-mist/20 p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                <span className="font-playfair text-forest text-lg font-bold">{t.name[0]}</span>
              </div>
              <div>
                <p className="font-dm text-ink font-semibold text-base">{t.name}</p>
                <p className="font-dm text-mist text-sm">{t.specialty}</p>
                <p className="font-dm text-mist text-xs mt-0.5">{t.cert}</p>
                <p className="font-dm text-sage text-xs font-semibold mt-1">★ {t.rating}</p>
              </div>
            </div>
            <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Available slots</p>
            <div className="flex flex-wrap gap-2">
              {t.slots.map(slot => (
                <button
                  key={slot}
                  onClick={() => navigate('/subscribe')}
                  className="px-3 py-1.5 rounded-full border border-mist/30 font-dm text-sm text-mist min-h-[40px]"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="font-dm text-mist text-xs text-center">
          Sessions are 10–15 min · Billed separately from subscription
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
