import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const MOCK_INSIGHTS = [
  {
    title: "You move more on medium-energy days.",
    body: "Based on your check-ins, you've completed 3 of your last 4 workouts on medium-energy days. Your body might be telling you something.",
    suggestion: "Try a 10-min workout next time you check in at Medium energy.",
  },
  {
    title: "Your reset habit is building.",
    body: "You've used The Reset twice this week — both after 7pm. That's a pattern worth naming.",
    suggestion: "Consider The Reset your default wind-down. It's already yours.",
  },
  {
    title: "Short workouts are adding up.",
    body: "Your total active time this week: 42 minutes. That's three 14-minute windows you found in the chaos.",
    suggestion: "Keep finding those windows. They're real.",
  },
];

export default function AIInsight() {
  const navigate = useNavigate();
  const { state } = useApp();

  const insightIndex = state.completedWorkouts.length % MOCK_INSIGHTS.length;
  const insight = MOCK_INSIGHTS[insightIndex];

  useEffect(() => {
    capture('ai_insight_viewed');
  }, []);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
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
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Your First Insight</p>
          <h1 className="font-playfair text-forest text-3xl font-bold italic leading-tight mb-3">
            {insight.title}
          </h1>
          <p className="font-dm text-mist text-base leading-relaxed">
            {insight.body}
          </p>
        </div>

        <div className="bg-forest/5 border border-forest/15 rounded-2xl p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Suggestion</p>
          <p className="font-dm text-forest text-base leading-relaxed italic">
            {insight.suggestion}
          </p>
        </div>

        {/* Upgrade prompt */}
        <button
          onClick={() => navigate('/subscribe')}
          className="w-full bg-forest rounded-2xl p-5 text-left active:scale-[0.98] transition-transform"
        >
          <p className="font-dm text-cream/70 text-xs uppercase tracking-widest font-semibold mb-1">Premium</p>
          <p className="font-dm text-cream font-semibold text-base mb-1">Unlock full AI insights</p>
          <p className="font-dm text-cream/70 text-sm">Weekly patterns, energy correlations, and personalised recommendations.</p>
        </button>

        {/* More coming */}
        <div className="text-center">
          <p className="font-dm text-mist text-sm italic">
            More insights appear as you build your history.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
