import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const DEMO_CHAT = [
  {
    role: 'user',
    text: 'Is a goblet squat safe at 8 weeks postpartum?',
  },
  {
    role: 'coach',
    text: "At 8 weeks, it depends on how your recovery is progressing. If you haven't had a postpartum check-up yet, I'd wait until you have clearance for moderate exercise. Once cleared, a supported goblet squat with a light weight can be a great starting point \u2014 just focus on your breathing and pelvic floor during the movement. Any pressure, pain, or leaking means it's too soon.",
  },
  {
    role: 'user',
    text: 'I only have 8 minutes. What should I do?',
  },
  {
    role: 'coach',
    text: "8 minutes is real. Try the Baby Nap Window \u2014 4 exercises, manageable effort, genuinely useful. Or if you're exhausted, The Reset takes 5 minutes and counts as much as anything else.",
  },
];

export default function AICoach() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream flex flex-col pb-24">
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
        <div className="flex-1 text-center">
          <p className="font-dm text-forest font-semibold text-base">WellParent Coach</p>
        </div>
      </div>

      {/* Coming soon banner */}
      <div className="mx-5 mb-4 bg-mist/10 rounded-xl px-4 py-3 flex items-center gap-3">
        <span className="text-base">🔒</span>
        <p className="font-dm text-mist text-sm">
          <span className="font-semibold text-forest">Phase 3 — Coming Month 7+.</span> Premium feature.
        </p>
      </div>

      {/* Chat preview */}
      <div className="flex-1 px-5 flex flex-col gap-4 overflow-y-auto">
        {DEMO_CHAT.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'coach' && (
              <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                <span className="text-cream text-xs font-dm font-bold">WP</span>
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-forest text-cream rounded-br-md'
                  : 'bg-white/80 text-ink rounded-bl-md border border-mist/20'
              }`}
            >
              <p className="font-dm text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        <div className="text-center py-4">
          <p className="font-dm text-mist text-sm italic">This is a preview of your AI Coach conversation.</p>
        </div>
      </div>

      {/* Locked input */}
      <div className="px-5 pb-32 pt-4 border-t border-mist/10">
        <button
          onClick={() => navigate('/subscribe')}
          className="w-full bg-forest/5 border border-forest/20 rounded-2xl px-5 py-4 text-left min-h-[56px]"
        >
          <p className="font-dm text-mist text-base">Ask your coach anything...</p>
          <p className="font-dm text-forest text-xs font-medium mt-1">Unlock with Premium →</p>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
