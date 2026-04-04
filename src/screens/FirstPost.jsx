import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { circles } from '../data/mentalHealth';

export default function FirstPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const circle = circles.find(c => c.id === id);

  const handleSubmit = () => {
    if (!text.trim()) return;
    localStorage.setItem(`wellparent_circle_posted_${id}`, 'true');
    capture('first_post_submitted', { circle_id: id, length: text.trim().length });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 text-center gap-8">
        <div>
          <p className="font-playfair text-cream text-4xl font-bold italic mb-4">
            You showed up here too.
          </p>
          <p className="font-dm text-cream/70 text-lg leading-relaxed">
            That takes something. Your post is in the circle.
          </p>
        </div>
        <button
          onClick={() => navigate(`/circles/${id}`)}
          className="bg-cream text-forest font-dm font-semibold text-lg rounded-full px-10 py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          Back to {circle?.name || 'Circle'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col pb-8">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(`/circles/${id}`)}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      <div className="flex-1 px-5 flex flex-col gap-6">
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">
            {circle?.name}
          </p>
          <h1 className="font-playfair text-forest text-2xl font-bold">
            Share your moment.
          </h1>
          <p className="font-dm text-mist text-base mt-2 leading-relaxed">
            No performance required. Just what's real right now.
          </p>
        </div>

        <div className="flex-1">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="What's happening for you today..."
            autoFocus
            className="w-full h-full min-h-[220px] bg-white/70 border border-mist/20 rounded-2xl p-5 font-dm text-ink text-base leading-relaxed resize-none focus:outline-none focus:border-forest/30 placeholder:text-mist/50"
          />
          <p className="font-dm text-mist text-xs mt-2 italic">
            Posts are visible to circle members only.
          </p>
        </div>
      </div>

      <div className="px-5 pt-4">
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className={`w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] transition-all duration-200 ${
            text.trim()
              ? 'bg-forest text-cream active:scale-95'
              : 'bg-mist/20 text-mist/50'
          }`}
        >
          Post to circle
        </button>
      </div>
    </div>
  );
}
