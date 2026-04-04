import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { circles } from '../data/mentalHealth';

export default function CircleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hasPosted, setHasPosted] = useState(false);

  const circle = circles.find(c => c.id === id);

  useEffect(() => {
    if (!circle) return;
    capture('circle_entered', { circle_id: id, circle_name: circle.name });
    const posted = localStorage.getItem(`wellparent_circle_posted_${id}`);
    if (posted) setHasPosted(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!circle) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-dm text-mist">Circle not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-8">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/community')}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Circles
        </button>
      </div>

      {/* Circle identity */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-forest/5 flex items-center justify-center">
            <span className="text-2xl">{circle.emoji}</span>
          </div>
          <div>
            <h1 className="font-playfair text-forest text-2xl font-bold">{circle.name}</h1>
            <p className="font-dm text-mist text-sm">{circle.members.toLocaleString()} members</p>
          </div>
        </div>
        <p className="font-dm text-mist text-base italic">{circle.tagline}</p>
      </div>

      {/* Post CTA */}
      {!hasPosted && (
        <div className="px-5 mb-5">
          <button
            onClick={() => navigate(`/circles/${id}/first-post`)}
            className="w-full bg-forest text-cream font-dm font-semibold text-base rounded-2xl px-5 py-4 min-h-[56px] text-left active:scale-[0.98] transition-transform"
          >
            <p className="text-cream/60 text-xs font-medium mb-0.5">Share your moment</p>
            <p>What's on your mind today? →</p>
          </button>
        </div>
      )}

      {hasPosted && (
        <div className="px-5 mb-5">
          <div className="bg-sage/10 border border-sage/20 rounded-2xl px-5 py-4">
            <p className="font-dm text-forest text-sm font-medium">You're part of this circle. ✓</p>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="px-5 flex flex-col gap-3">
        <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold">Recent</p>
        {circle.posts.map(post => (
          <button
            key={post.id}
            onClick={() => navigate(`/circles/${id}/post/${post.id}`)}
            className="w-full bg-white/70 rounded-2xl border border-mist/20 p-5 text-left active:scale-[0.98] transition-transform"
          >
            <p className="font-dm text-ink text-base leading-relaxed mb-3">
              {post.content}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-dm text-mist text-sm font-medium">{post.author}</span>
              <div className="flex items-center gap-2">
                <span className="font-dm text-mist text-xs">{post.time}</span>
                <span className="font-dm text-mist text-xs">·</span>
                <span className="text-sm">🌿</span>
                <span className="font-dm text-mist text-sm">{post.reactions}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
