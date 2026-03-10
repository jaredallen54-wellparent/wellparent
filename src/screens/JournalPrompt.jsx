import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { journalPrompts } from '../data/mentalHealth';
import BottomNav from '../components/BottomNav';

const STORAGE_KEY = 'wellparent_journal';

function getJournalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveJournalEntry(date, text) {
  try {
    const existing = getJournalStorage();
    existing[date] = text;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // storage unavailable
  }
}

export default function JournalPrompt() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const promptIndex = Math.floor(Date.now() / 86400000) % journalPrompts.length;
  const prompt = journalPrompts[promptIndex];

  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load existing entry for today
    const entries = getJournalStorage();
    if (entries[today]) {
      setText(entries[today]);
    }
    capture('journal_opened');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDone = () => {
    if (text.trim()) {
      saveJournalEntry(today, text.trim());
      capture('journal_saved', { day: today, length: text.trim().length });
      setSaved(true);
      setTimeout(() => navigate('/mind'), 600);
    } else {
      navigate('/mind');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/mind')}
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
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Today's prompt
          </p>
          <h1 className="font-playfair text-forest text-2xl font-bold italic leading-snug">
            "{prompt}"
          </h1>
        </div>

        <div className="flex-1">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Start writing... or don't. Either is fine."
            className="w-full h-full min-h-[240px] bg-white/70 border border-mist/20 rounded-2xl p-5 font-dm text-ink text-base leading-relaxed resize-none focus:outline-none focus:border-forest/30 placeholder:text-mist/50"
          />
          <p className="font-dm text-mist text-xs mt-2 italic">
            Saved locally on this device. Never sent anywhere.
          </p>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8 bg-cream/80 backdrop-blur-sm">
        <button
          onClick={handleDone}
          className={`w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] transition-all duration-200 ${
            saved ? 'bg-sage text-forest' : 'bg-forest text-cream active:scale-95'
          }`}
        >
          {saved ? 'Saved ✓' : 'Done'}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
