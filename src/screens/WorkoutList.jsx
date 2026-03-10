import { useState, useEffect } from 'react';
import { capture } from '../context/AppContext';
import { workouts } from '../data/workouts';
import WorkoutCard from '../components/WorkoutCard';
import BottomNav from '../components/BottomNav';

const DURATION_FILTERS = [
  { id: 'all', label: 'All' },
  { id: '10', label: '≤10 min' },
  { id: '20', label: '≤20 min' },
  { id: '30', label: '30 min' },
];

const EQUIPMENT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'bodyweight', label: 'Bodyweight' },
  { id: 'dumbbells', label: 'Dumbbells' },
];

const FOCUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Strength', label: 'Strength' },
  { id: 'Mobility', label: 'Mobility' },
  { id: 'Energy', label: 'Energy' },
];

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full font-dm text-sm font-medium transition-all duration-200 min-h-[40px] ${
        active
          ? 'bg-forest text-cream'
          : 'bg-white/70 text-mist border border-mist/30'
      }`}
    >
      {label}
    </button>
  );
}

export default function WorkoutList() {
  const [durationFilter, setDurationFilter] = useState('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [focusFilter, setFocusFilter] = useState('all');

  useEffect(() => {
    capture('workout_list_viewed');
  }, []);

  const filtered = workouts.filter(w => {
    if (durationFilter !== 'all') {
      const maxMin = parseInt(durationFilter, 10);
      if (w.duration > maxMin) return false;
    }
    if (equipmentFilter !== 'all') {
      if (equipmentFilter === 'bodyweight' && w.equipment?.length > 0) return false;
      if (equipmentFilter === 'dumbbells' && !w.equipment?.includes('dumbbells')) return false;
    }
    if (focusFilter !== 'all' && w.focus !== focusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-4">
        <h1 className="font-playfair text-forest text-3xl font-bold mb-1">Workouts</h1>
        <p className="font-dm text-mist text-base">
          Built around your day, not the other way around.
        </p>
      </div>

      {/* Filter rows */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
          {DURATION_FILTERS.map(f => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={durationFilter === f.id}
              onClick={() => setDurationFilter(f.id)}
            />
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar">
          {EQUIPMENT_FILTERS.map(f => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={equipmentFilter === f.id}
              onClick={() => setEquipmentFilter(f.id)}
            />
          ))}
          {FOCUS_FILTERS.slice(1).map(f => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={focusFilter === f.id}
              onClick={() => setFocusFilter(prev => prev === f.id ? 'all' : f.id)}
            />
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-dm text-mist text-base">No workouts match those filters.</p>
            <button
              onClick={() => { setDurationFilter('all'); setEquipmentFilter('all'); setFocusFilter('all'); }}
              className="font-dm text-forest text-sm font-medium mt-3 min-h-[44px] px-4"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-1">
              {filtered.length} workout{filtered.length !== 1 ? 's' : ''}
            </p>
            {filtered.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
