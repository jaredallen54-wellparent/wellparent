import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { communityThreads } from '../data/mentalHealth';
import BottomNav from '../components/BottomNav';

const CATEGORY_COLORS = {
  'Baby Nap PRs': 'bg-sage/20 text-sage',
  'Postpartum Progress': 'bg-forest/10 text-forest',
  'Caregiver Corner': 'bg-mist/20 text-mist',
};

export default function CommunitySpace() {
  const navigate = useNavigate();

  useEffect(() => {
    capture('community_viewed');
  }, []);

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
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Phase 2 Feature</p>
          <h1 className="font-playfair text-forest text-3xl font-bold mb-1">Community</h1>
          <p className="font-dm text-mist text-base">
            Real parents. Real moments. No performance required.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['All', 'Baby Nap PRs', 'Postpartum Progress', 'Caregiver Corner'].map(cat => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-dm text-sm font-medium min-h-[40px] ${
                cat === 'All'
                  ? 'bg-forest text-cream'
                  : 'bg-white/70 text-mist border border-mist/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Thread feed */}
        <div className="flex flex-col gap-3">
          {communityThreads.map(thread => (
            <div key={thread.id} className="bg-white/70 rounded-2xl border border-mist/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`font-dm text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[thread.category] || 'bg-mist/20 text-mist'}`}>
                  {thread.category}
                </span>
                <span className="font-dm text-mist text-xs">{thread.time}</span>
              </div>
              <p className="font-dm text-ink text-base leading-relaxed mb-3">
                {thread.content}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-dm text-mist text-sm font-medium">{thread.author}</span>
                <div className="flex items-center gap-1">
                  <span className="text-base">🌿</span>
                  <span className="font-dm text-mist text-sm">{thread.reactions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compose — locked */}
        <div className="relative">
          <div className="bg-white/70 rounded-2xl border border-mist/20 p-5 opacity-50 pointer-events-none">
            <p className="font-dm text-mist text-base">Share your moment...</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-cream/50 rounded-2xl backdrop-blur-[1px]">
            <button
              onClick={() => navigate('/subscribe')}
              className="bg-forest text-cream font-dm font-semibold text-sm rounded-full px-6 py-3 min-h-[48px] active:scale-95 transition-transform"
            >
              Unlock with Premium
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
