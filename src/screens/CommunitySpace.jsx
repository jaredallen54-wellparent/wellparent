import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { circles } from '../data/mentalHealth';
import BottomNav from '../components/BottomNav';

export default function CommunitySpace() {
  const navigate = useNavigate();

  useEffect(() => {
    capture('circles_home_viewed');
  }, []);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-6">
        <h1 className="font-playfair text-forest text-3xl font-bold mb-1">Circles</h1>
        <p className="font-dm text-mist text-base italic">
          Real parents. Real moments. No performance required.
        </p>
      </div>

      <div className="px-5 flex flex-col gap-3">
        {circles.map(circle => (
          <button
            key={circle.id}
            onClick={() => navigate(`/circles/${circle.id}`)}
            className="w-full bg-white/70 rounded-2xl p-5 border border-mist/20 text-left active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{circle.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair text-forest text-lg font-bold leading-tight">
                  {circle.name}
                </h3>
                <p className="font-dm text-mist text-sm italic mt-0.5">{circle.tagline}</p>
                <p className="font-dm text-mist text-xs mt-1.5">
                  {circle.members.toLocaleString()} members
                </p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                <path d="M7 4L13 10L7 16" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}

        {/* Gentle note */}
        <div className="bg-forest/5 rounded-2xl p-5 mt-2">
          <p className="font-dm text-forest text-sm leading-relaxed">
            Circles is in early access. Posts and members shown are from our seed community.
            Your voice shapes what this becomes.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
