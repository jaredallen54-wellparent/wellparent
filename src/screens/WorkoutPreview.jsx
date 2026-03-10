import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp, capture } from '../context/AppContext';
import { allWorkouts } from '../data/workouts';

export default function WorkoutPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();

  const workout = allWorkouts.find(w => w.id === id);

  useEffect(() => {
    if (workout) capture('workout_preview_viewed', { workout_id: id });
  }, [id, workout]);

  if (!workout) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-dm text-mist">Workout not found.</p>
      </div>
    );
  }

  const equipmentLabel = workout.equipment?.length
    ? workout.equipment.join(', ')
    : 'No equipment';

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      <div className="flex-1 px-5 pb-32 overflow-y-auto">
        {/* Title */}
        <div className="mb-6">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">
            {workout.isReset ? 'The Reset' : 'Workout'}
          </p>
          <h1 className="font-playfair text-forest text-3xl font-bold leading-tight mb-1">
            {workout.name}
          </h1>
          <p className="font-dm text-mist text-base italic">{workout.tag}</p>
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-forest/10 text-forest font-dm text-sm font-medium px-3 py-1.5 rounded-full">
            {workout.duration} min
          </span>
          {workout.level && (
            <span className="bg-mist/20 text-mist font-dm text-sm font-medium px-3 py-1.5 rounded-full">
              {workout.level}
            </span>
          )}
          {workout.postpartum_safe && (
            <span className="bg-sage/20 text-sage font-dm text-sm font-medium px-3 py-1.5 rounded-full">
              Postpartum-safe
            </span>
          )}
        </div>

        {/* Equipment */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-4 mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M5 5l-3 3 3 3M11 5l3 3-3 3" stroke="#1C4A3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold">Equipment</p>
            <p className="font-dm text-ink text-sm capitalize">{equipmentLabel}</p>
          </div>
        </div>

        {/* Postpartum safety note */}
        {state.postpartumMode && workout.postpartum_safe && (
          <div className="bg-sage/10 border border-sage/30 rounded-2xl p-4 mb-6">
            <p className="font-dm text-forest text-sm leading-relaxed">
              <span className="font-semibold">Postpartum-safe.</span> This workout has been selected with postpartum recovery in mind. Check with your care provider before starting any new movement.
            </p>
          </div>
        )}

        {/* Exercise list */}
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">
            {workout.exercises.length} exercises
          </p>
          <div className="flex flex-col gap-2">
            {workout.exercises.map((ex, i) => (
              <div
                key={ex.id}
                className="bg-white/70 rounded-xl px-4 py-3 border border-mist/20 flex items-start gap-3"
              >
                <span className="font-dm text-mist text-xs font-semibold mt-1 w-5 flex-shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <p className="font-dm text-ink font-semibold text-sm">{ex.name}</p>
                  {ex.sets && ex.reps && (
                    <p className="font-dm text-mist text-xs mt-0.5">{ex.sets} sets × {ex.reps} reps</p>
                  )}
                  {ex.duration && (
                    <p className="font-dm text-mist text-xs mt-0.5">{ex.duration}s</p>
                  )}
                  <p className="font-dm text-mist text-xs italic mt-1 leading-relaxed">{ex.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-8 pt-4 bg-cream/90 backdrop-blur-sm border-t border-mist/10">
        <button
          onClick={() => navigate(workout.isReset ? '/reset' : `/workout/${workout.id}`)}
          className={`w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] active:scale-95 transition-transform ${
            workout.isReset ? 'text-white' : 'bg-forest text-cream'
          }`}
          style={workout.isReset ? { backgroundColor: '#C4623A' } : {}}
        >
          Start {workout.isReset ? 'Reset' : 'Workout'}
        </button>
      </div>
    </div>
  );
}
