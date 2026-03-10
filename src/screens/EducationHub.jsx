import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const ARTICLES = [
  {
    topic: 'Postpartum',
    title: 'The 4 stages of postpartum recovery — and what your body needs at each one',
    author: 'Dr. Sarah Chen',
    readTime: '6 min read',
  },
  {
    topic: 'Injury Prevention',
    title: 'Why parents carry everything in their shoulders — and what to do about it',
    author: 'Marcus Williams',
    readTime: '4 min read',
  },
  {
    topic: 'Nutrition',
    title: 'Eating well when you have 4 minutes to eat',
    author: 'WellParent Team',
    readTime: '5 min read',
  },
  {
    topic: 'Sleep',
    title: "The sleep debt myth \u2014 and what actually helps when you're chronically tired",
    author: 'Priya Sharma',
    readTime: '7 min read',
  },
  {
    topic: 'Posture',
    title: 'The feeding posture fix that takes 90 seconds',
    author: 'Marcus Williams',
    readTime: '3 min read',
  },
  {
    topic: 'Mental Health',
    title: "Why exercise feels impossible when you're depleted \u2014 and the smallest thing that still counts",
    author: 'WellParent Team',
    readTime: '5 min read',
  },
];

const TOPIC_COLORS = {
  'Postpartum': 'bg-sage/20 text-sage',
  'Injury Prevention': 'bg-forest/10 text-forest',
  'Nutrition': 'bg-mist/20 text-mist',
  'Sleep': 'bg-forest/10 text-forest',
  'Posture': 'bg-mist/20 text-mist',
  'Mental Health': 'bg-sage/20 text-sage',
};

export default function EducationHub() {
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
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Phase 3 — Month 10+</p>
          <h1 className="font-playfair text-forest text-3xl font-bold mb-2">Education Hub</h1>
          <p className="font-dm text-mist text-base">
            Expert-written guides for parents who want to understand their bodies.
          </p>
        </div>

        <div className="bg-mist/10 rounded-2xl px-5 py-4">
          <p className="font-dm text-mist text-sm">
            <span className="font-semibold text-forest">Coming Month 10.</span> Articles and video content are in production.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {ARTICLES.map((article, i) => (
            <button
              key={i}
              onClick={() => navigate('/subscribe')}
              className="w-full bg-white/70 rounded-2xl border border-mist/20 p-5 text-left active:scale-[0.98] transition-transform"
            >
              <span className={`inline-block font-dm text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${TOPIC_COLORS[article.topic]}`}>
                {article.topic}
              </span>
              <h3 className="font-dm text-ink font-semibold text-base leading-snug mb-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-2">
                <p className="font-dm text-mist text-xs">{article.author}</p>
                <span className="text-mist text-xs">·</span>
                <p className="font-dm text-mist text-xs">{article.readTime}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
