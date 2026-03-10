import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { breathingExercises, sleepMeditations, journalPrompts } from '../data/mentalHealth';
import BottomNav from '../components/BottomNav';

function ContentCard({ item, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white/70 rounded-2xl p-5 border border-mist/20 text-left active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">
            {item.duration ? `${item.duration} min` : 'Open'}
          </p>
          <h3 className="font-playfair text-forest text-lg font-bold mb-1">
            {item.name || item}
          </h3>
          {item.description && (
            <p className="font-dm text-mist text-sm leading-relaxed">{item.description}</p>
          )}
          {item.offlineAvailable && (
            <span className="inline-block mt-2 font-dm text-xs text-sage bg-sage/10 px-2.5 py-1 rounded-full">
              Available offline
            </span>
          )}
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-1 flex-shrink-0">
          <path d="M7 4L13 10L7 16" stroke={accent || '#9DB8AE'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </button>
  );
}

export default function MindScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    capture('mind_tab_viewed');
  }, []);

  const todayPromptIndex = Math.floor(Date.now() / 86400000) % journalPrompts.length;
  const todayPrompt = journalPrompts[todayPromptIndex];

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-6">
        <h1 className="font-playfair text-forest text-3xl font-bold mb-1">Mind</h1>
        <p className="font-dm text-mist text-base italic">
          Your mental health matters as much as your body.
        </p>
      </div>

      <div className="px-5 flex flex-col gap-8">

        {/* Breathing */}
        <section>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Breathing
          </p>
          <div className="flex flex-col gap-3">
            {breathingExercises.map(ex => (
              <ContentCard
                key={ex.id}
                item={ex}
                onClick={() => navigate(`/mind/breathing/${ex.id}`)}
                accent="#7AAF96"
              />
            ))}
          </div>
        </section>

        {/* Sleep */}
        <section>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Sleep
          </p>
          <div className="flex flex-col gap-3">
            {sleepMeditations.map(med => (
              <button
                key={med.id}
                className="w-full bg-white/70 rounded-2xl p-5 border border-mist/20 text-left opacity-70"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">
                      {med.duration} min
                    </p>
                    <h3 className="font-playfair text-forest text-lg font-bold mb-1">{med.name}</h3>
                    <p className="font-dm text-mist text-sm leading-relaxed">{med.description}</p>
                    <span className="inline-block mt-2 font-dm text-xs text-mist bg-mist/10 px-2.5 py-1 rounded-full">
                      Audio coming soon
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Journal */}
        <section>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Journal
          </p>
          <button
            onClick={() => navigate('/mind/journal')}
            className="w-full rounded-2xl p-5 text-left active:scale-[0.98] transition-transform border"
            style={{ backgroundColor: 'rgba(28,74,62,0.04)', borderColor: 'rgba(28,74,62,0.15)' }}
          >
            <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">
              Today's prompt
            </p>
            <p className="font-playfair text-forest text-lg font-bold italic leading-snug mb-3">
              "{todayPrompt}"
            </p>
            <p className="font-dm text-forest text-sm font-medium">
              Write something →
            </p>
          </button>
        </section>

      </div>

      <BottomNav />
    </div>
  );
}
