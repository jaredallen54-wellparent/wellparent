import { useEffect } from 'react';
import { capture } from '../context/AppContext';
import { workouts } from '../data/workouts';
import WorkoutCard from '../components/WorkoutCard';
import BottomNav from '../components/BottomNav';

export default function WorkoutList() {
  useEffect(() => {
    capture('workout_list_viewed');
  }, []);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-6">
        <h1 className="font-playfair text-forest text-3xl font-bold mb-1">Workouts</h1>
        <p className="font-dm text-mist text-base">
          Built around your day, not the other way around.
        </p>
      </div>

      <div className="px-5 flex flex-col gap-3">
        {workouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
