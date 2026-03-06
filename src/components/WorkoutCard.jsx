import { useNavigate } from 'react-router-dom';

export default function WorkoutCard({ workout }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/workout/${workout.id}`)}
      className="w-full bg-white/70 rounded-2xl p-5 border border-mist/20 text-left active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-playfair text-forest text-xl font-bold mb-0.5">
            {workout.name}
          </h3>
          <p className="font-dm text-mist text-sm italic mb-3">{workout.tag}</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-forest/10 text-forest font-dm text-xs font-medium px-3 py-1 rounded-full">
              {workout.duration} min
            </span>
            <span className="bg-mist/20 text-mist font-dm text-xs font-medium px-3 py-1 rounded-full">
              {workout.level}
            </span>
            {workout.postpartumSafe && (
              <span className="bg-sage/20 text-sage font-dm text-xs font-medium px-3 py-1 rounded-full">
                Postpartum-safe
              </span>
            )}
            {workout.equipment && workout.equipment !== 'None' && (
              <span className="bg-mist/10 text-mist font-dm text-xs px-3 py-1 rounded-full">
                {workout.equipment}
              </span>
            )}
          </div>
        </div>
        <div className="text-mist mt-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L13 10L7 16" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </button>
  );
}
