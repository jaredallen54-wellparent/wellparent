import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'wellparent_state';

const defaultState = {
  persona: null,
  weeklyGoal: null,
  onboardingComplete: false,
  activeWorkout: null,
  completedWorkouts: [],
  energyToday: null,
  energyDate: null,
  currentStreak: 0,
  energyCheckInEnabled: true,
};

// Recompute streak from full history — more robust than incrementing
// Ignores pause events; only reads completedAt dates
function computeStreak(completedWorkouts) {
  if (!completedWorkouts.length) return 0;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // Get unique completion dates, sorted descending
  const dates = [...new Set(
    completedWorkouts.map(w => w.completedAt.slice(0, 10))
  )].sort().reverse();

  // Streak is dead if most recent completion is before yesterday
  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1] + 'T12:00:00');
    const curr = new Date(dates[i] + 'T12:00:00');
    const diffDays = Math.round((prev - curr) / 86400000);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PERSONA':
      return { ...state, persona: action.payload };

    case 'SET_WEEKLY_GOAL':
      return { ...state, weeklyGoal: action.payload };

    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true };

    case 'START_WORKOUT':
      return {
        ...state,
        activeWorkout: {
          workoutId: action.payload.workoutId,
          exerciseIndex: 0,
          setIndex: 0,
          activeElapsed: 0,     // ms of active (non-paused) time accumulated
          pausedAt: null,
          isReset: action.payload.isReset || false,
        }
      };

    case 'PAUSE_WORKOUT':
      return {
        ...state,
        activeWorkout: {
          ...state.activeWorkout,
          exerciseIndex: action.payload.exerciseIndex,
          setIndex: action.payload.setIndex ?? 0,
          activeElapsed: action.payload.activeElapsed,   // accumulated ms
          pausedAt: Date.now(),
        }
      };

    case 'RESUME_WORKOUT':
      return {
        ...state,
        activeWorkout: {
          ...state.activeWorkout,
          pausedAt: null,
        }
      };

    case 'COMPLETE_WORKOUT': {
      const today = new Date().toISOString().slice(0, 10);
      const newEntry = {
        workoutId: action.payload.workoutId,
        completedAt: today,
        paused: action.payload.paused || false,
        activeDuration: action.payload.activeDuration,  // seconds
        isReset: action.payload.isReset || false,
      };
      const newCompleted = [...state.completedWorkouts, newEntry];
      return {
        ...state,
        activeWorkout: null,
        completedWorkouts: newCompleted,
        currentStreak: computeStreak(newCompleted),
      };
    }

    case 'ABANDON_WORKOUT':
      return { ...state, activeWorkout: null };

    case 'SET_ENERGY':
      return {
        ...state,
        energyToday: action.payload,
        energyDate: new Date().toISOString().slice(0, 10),
      };

    case 'SET_ENERGY_CHECKIN_ENABLED':
      return { ...state, energyCheckInEnabled: action.payload };

    case 'RESET_DATA':
      return { ...defaultState };

    default:
      return state;
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    // Clear energy check-in if it was set on a different day
    const today = new Date().toISOString().slice(0, 10);
    if (parsed.energyDate !== today) {
      parsed.energyToday = null;
      parsed.energyDate = null;
    }
    // Recompute streak on load (handles case where app wasn't opened for days)
    if (parsed.completedWorkouts?.length) {
      parsed.currentStreak = computeStreak(parsed.completedWorkouts);
    }
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function capture(event, props) {
  try {
    window.posthog?.capture(event, props);
  } catch {
    // PostHog not loaded
  }
}
