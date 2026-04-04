import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { quickMeals, energyTips, hydrationData } from '../data/nutritionData';
import BottomNav from '../components/BottomNav';

export default function NutritionHub() {
  const navigate = useNavigate();

  useEffect(() => {
    capture('nutrition_hub_viewed');
  }, []);

  const todayTipIndex = Math.floor(Date.now() / 86400000) % energyTips.length;
  const todayTip = energyTips[todayTipIndex];

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-6">
        <h1 className="font-playfair text-forest text-3xl font-bold mb-1">Fuel</h1>
        <p className="font-dm text-mist text-base italic">
          Simple food that works for parent life.
        </p>
      </div>

      <div className="px-5 flex flex-col gap-8">

        {/* Today's Energy Tip */}
        <section>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Today's insight
          </p>
          <button
            onClick={() => navigate(`/nutrition/energy-tip/${todayTip.id}`)}
            className="w-full rounded-2xl p-5 text-left active:scale-[0.98] transition-transform border"
            style={{ backgroundColor: 'rgba(28,74,62,0.04)', borderColor: 'rgba(28,74,62,0.15)' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{todayTip.emoji}</span>
              <div className="flex-1">
                <h3 className="font-playfair text-forest text-lg font-bold mb-1">{todayTip.title}</h3>
                <p className="font-dm text-mist text-sm leading-relaxed line-clamp-2">{todayTip.body}</p>
                <p className="font-dm text-forest text-sm font-medium mt-2">Read more →</p>
              </div>
            </div>
          </button>
        </section>

        {/* Hydration */}
        <section>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Hydration
          </p>
          <button
            onClick={() => navigate('/nutrition/hydration')}
            className="w-full bg-white/70 rounded-2xl p-5 border border-mist/20 text-left active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💧</span>
              </div>
              <div className="flex-1">
                <h3 className="font-playfair text-forest text-lg font-bold">Water Guide</h3>
                <p className="font-dm text-mist text-sm mt-0.5">
                  Simple cues for staying hydrated around your day
                </p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                <path d="M7 4L13 10L7 16" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </section>

        {/* Quick meals */}
        <section>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Quick meals
          </p>
          <div className="flex flex-col gap-3">
            {quickMeals.map(meal => (
              <button
                key={meal.id}
                onClick={() => navigate(`/nutrition/meal/${meal.id}`)}
                className="w-full bg-white/70 rounded-2xl p-5 border border-mist/20 text-left active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-dm text-mist text-xs bg-mist/15 px-2.5 py-0.5 rounded-full">
                        {meal.tag}
                      </span>
                    </div>
                    <h3 className="font-playfair text-forest text-lg font-bold">{meal.name}</h3>
                    <p className="font-dm text-mist text-sm mt-1 leading-relaxed">{meal.description}</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-1">
                    <path d="M7 4L13 10L7 16" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* All energy tips */}
        <section>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            Energy insights
          </p>
          <div className="flex flex-col gap-3">
            {energyTips.filter(t => t.id !== todayTip.id).map(tip => (
              <button
                key={tip.id}
                onClick={() => navigate(`/nutrition/energy-tip/${tip.id}`)}
                className="w-full bg-white/70 rounded-2xl p-5 border border-mist/20 text-left active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tip.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-playfair text-forest text-base font-bold">{tip.title}</h3>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                    <path d="M7 4L13 10L7 16" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </section>

      </div>

      <BottomNav />
    </div>
  );
}
