import { useNavigate } from 'react-router-dom';

export default function CorporatePortal() {
  const navigate = useNavigate();

  const METRICS = [
    { label: 'Active employees', value: '124' },
    { label: 'Avg. workouts / week', value: '2.3' },
    { label: 'Reset completions', value: '341' },
    { label: 'Engagement rate', value: '68%' },
  ];

  return (
    <div className="min-h-screen bg-cream pb-10">
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
        <div className="flex-1 text-right">
          <span className="font-dm text-mist text-xs bg-mist/10 px-3 py-1 rounded-full">Admin View</span>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-6">
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Phase 3 — Month 14+</p>
          <h1 className="font-playfair text-forest text-3xl font-bold mb-2">Corporate Wellness</h1>
          <p className="font-dm text-mist text-base">
            Employer-funded wellbeing for your parent employees. Aggregate, anonymous reporting.
          </p>
        </div>

        <div className="bg-mist/10 rounded-2xl px-5 py-4">
          <p className="font-dm text-mist text-sm">
            <span className="font-semibold text-forest">Coming Month 14.</span> Enterprise pricing available on request.
          </p>
        </div>

        {/* Mock aggregate dashboard */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-4">
            Acme Corp — This Month
          </p>
          <div className="grid grid-cols-2 gap-3">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-cream/80 rounded-xl p-4 text-center">
                <p className="font-playfair text-forest text-2xl font-bold">{m.value}</p>
                <p className="font-dm text-mist text-xs mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seat management */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-4">Seat Management</p>
          <div className="flex items-center justify-between mb-3">
            <p className="font-dm text-ink text-base">Active seats</p>
            <p className="font-dm text-forest font-semibold text-base">124 / 200</p>
          </div>
          <div className="w-full h-2 bg-mist/20 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-sage rounded-full" style={{ width: '62%' }} />
          </div>
          <button
            className="w-full border-2 border-forest/30 text-forest font-dm font-medium text-base rounded-full py-3 min-h-[48px]"
          >
            Invite more employees
          </button>
        </div>

        <p className="font-dm text-mist text-xs text-center leading-relaxed">
          All reporting is anonymous and aggregate. Individual employee data is never visible to employers.
        </p>
      </div>
    </div>
  );
}
