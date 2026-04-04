import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import { quickMeals } from '../data/nutritionData';

export default function QuickMeal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const meal = quickMeals.find(m => m.id === id);

  useEffect(() => {
    if (!meal) return;
    capture('quick_meal_viewed', { meal_id: id, meal_name: meal.name });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!meal) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-dm text-mist">Meal not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-8">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/nutrition')}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Fuel
        </button>
      </div>

      <div className="px-5 flex flex-col gap-6">
        {/* Tag */}
        <span className="self-start font-dm text-mist text-xs bg-mist/15 px-3 py-1 rounded-full">
          {meal.tag}
        </span>

        {/* Title */}
        <div>
          <h1 className="font-playfair text-forest text-3xl font-bold leading-tight">
            {meal.name}
          </h1>
        </div>

        {/* Description */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-ink text-base leading-relaxed">
            {meal.description}
          </p>
        </div>

        {/* Ingredients */}
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            What you need
          </p>
          <div className="flex flex-col gap-2">
            {meal.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/70 rounded-xl border border-mist/15 px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                <span className="font-dm text-ink text-base">{ing}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why it works */}
        <div
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: 'rgba(28,74,62,0.04)', borderColor: 'rgba(28,74,62,0.15)' }}
        >
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">
            Why it works
          </p>
          <p className="font-dm text-forest text-base leading-relaxed">
            {meal.why}
          </p>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/nutrition')}
          className="w-full bg-forest text-cream font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform"
        >
          More quick meals
        </button>
      </div>
    </div>
  );
}
