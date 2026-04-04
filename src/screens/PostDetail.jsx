import { useParams, useNavigate } from 'react-router-dom';
import { circles } from '../data/mentalHealth';

export default function PostDetail() {
  const { id, postId } = useParams();
  const navigate = useNavigate();

  const circle = circles.find(c => c.id === id);
  const post = circle?.posts.find(p => p.id === postId);

  if (!circle || !post) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-dm text-mist">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-8">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(`/circles/${id}`)}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {circle.name}
        </button>
      </div>

      <div className="px-5 flex flex-col gap-5">
        {/* Post */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-6">
          <p className="font-dm text-ink text-lg leading-relaxed mb-5">
            {post.content}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-mist/10">
            <div>
              <p className="font-dm text-forest font-semibold text-base">{post.author}</p>
              <p className="font-dm text-mist text-sm">{post.time}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <span className="font-dm text-forest font-semibold text-lg">{post.reactions}</span>
            </div>
          </div>
        </div>

        {/* Circle context */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center">
            <span className="text-lg">{circle.emoji}</span>
          </div>
          <div>
            <p className="font-dm text-forest text-sm font-semibold">{circle.name}</p>
            <p className="font-dm text-mist text-xs">{circle.members.toLocaleString()} members</p>
          </div>
        </div>

        {/* Reply prompt (locked) */}
        <div className="relative">
          <div className="bg-white/70 rounded-2xl border border-mist/20 p-5 opacity-50 pointer-events-none">
            <p className="font-dm text-mist text-base">Reply to {post.author.split(' ')[0]}...</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
            <button
              onClick={() => navigate('/subscribe')}
              className="bg-forest text-cream font-dm font-semibold text-sm rounded-full px-6 py-3 min-h-[48px] active:scale-95 transition-transform"
            >
              Unlock replies with Premium
            </button>
          </div>
        </div>

        {/* Back to circle */}
        <button
          onClick={() => navigate(`/circles/${id}`)}
          className="w-full bg-white/70 border border-mist/20 text-forest font-dm font-semibold text-base rounded-2xl py-4 min-h-[56px] active:scale-[0.98] transition-transform"
        >
          More from {circle.name}
        </button>
      </div>
    </div>
  );
}
