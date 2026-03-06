import { useEffect } from 'react';
import { useApp, capture } from '../context/AppContext';
import StreakBadge from '../components/StreakBadge';
import BottomNav from '../components/BottomNav';
import { workouts } from '../data/workouts';

function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s > 0 ? s + 's' : ''}`.trim();
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getWeekWorkouts(completedWorkouts) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  const weekStart = startOfWeek.toISOString().slice(0, 10);
  return completedWorkouts.filter(w => !w.isReset && w.completedAt >= weekStart);
}

function getGoalLabel(weeklyGoal) {
  const map = { '2x': 2, '3x': 3, '4x': 4 };
  return map[weeklyGoal] || 3;
}

export default function Progress() {
  const { state } = useApp();

  useEffect(() => {
    capture('progress_viewed');
  }, []);

  const weekWorkouts = getWeekWorkouts(state.completedWorkouts);
  const weekGoal = getGoalLabel(state.weeklyGoal);
  const weekProgress = Math.min(weekWorkouts.length, weekGoal);
  const weekMet = weekProgress >= weekGoal;

  const recentWorkouts = [...state.completedWorkouts]
    .filter(w => !w.isReset)
    .reverse()
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-6">
        <h1 className="font-playfair text-forest text-3xl font-bold">Your Progress</h1>
      </div>

      <div className="px-5 flex flex-col gap-6">
        {/* Streak badge */}
        <div className="bg-white/70 rounded-2xl p-8 border border-mist/20 flex justify-center">
          <StreakBadge streak={state.currentStreak} />
        </div>

        {/* Weekly goal bar */}
        <div className="bg-white/70 rounded-2xl p-5 border border-mist/20">
          <div className="flex items-center justify-between mb-3">
            <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold">This Week</p>
            <p className="font-dm text-forest text-sm font-semibold">
              {state.weeklyGoal || '3×'} goal
            </p>
          </div>
          <div className="w-full h-3 bg-mist/20 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(weekProgress / weekGoal) * 100}%`,
                backgroundColor: '#7AAF96'
              }}
            />
          </div>
          <p className={`font-dm text-sm font-medium ${weekMet ? 'text-forest' : 'text-mist'}`}>
            {weekMet
              ? 'Goal reached. You did it.'
              : `${weekProgress} of ${weekGoal} this week`
            }
          </p>
        </div>

        {/* Recent workouts */}
        {recentWorkouts.length > 0 && (
          <div>
            <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3 px-1">
              Recent
            </p>
            <div className="flex flex-col gap-2">
              {recentWorkouts.map((w, i) => {
                const workout = workouts.find(wo => wo.id === w.workoutId);
                return (
                  <div
                    key={i}
                    className="bg-white/70 rounded-xl px-4 py-3 border border-mist/20 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-dm text-ink font-medium text-sm">
                        {workout?.name || 'Workout'}
                      </p>
                      <p className="font-dm text-mist text-xs mt-0.5">
                        {formatDate(w.completedAt)} · {formatDuration(w.activeDuration)}
                      </p>
                    </div>
                    {w.paused && (
                      <span className="font-dm text-mist text-xs bg-mist/15 px-2 py-1 rounded-full">
                        ↩ resumed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {recentWorkouts.length === 0 && (
          <div className="text-center py-8">
            <p className="font-dm text-mist text-base">No workouts yet.</p>
            <p className="font-dm text-mist text-sm mt-1">Your first one counts.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
