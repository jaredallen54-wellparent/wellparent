# CLAUDE.md — WellParent Codebase Guide

This file provides context for AI assistants working in this repository.

---

## Project Overview

**WellParent** is a mobile-first React SPA (Single Page Application) for parents to complete short fitness workouts. It is a frontend-only MVP (v0.1) with no backend, database, or authentication. All state is persisted in browser `localStorage`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (functional components + hooks) |
| Router | React Router DOM 7 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 3 + custom animations in `index.css` |
| CSS processing | PostCSS + Autoprefixer |
| Analytics | PostHog (client-side, key hardcoded in `index.html`) |
| State | React Context + `useReducer` + `localStorage` |
| Linting | ESLint 9 |
| Testing | **None — no test framework configured** |

---

## Repository Structure

```
wellparent/
├── index.html               # HTML entry point (loads Google Fonts + PostHog)
├── vite.config.js           # Vite build config
├── tailwind.config.js       # Custom design tokens (colors, fonts)
├── postcss.config.js        # PostCSS setup
├── eslint.config.js         # ESLint rules
├── package.json             # Dependencies and scripts
└── src/
    ├── main.jsx             # React app mount point
    ├── App.jsx              # All route definitions + GuardedRoute
    ├── index.css            # Global styles + custom @keyframes
    ├── context/
    │   └── AppContext.jsx   # Central state (Context + useReducer + localStorage)
    ├── data/
    │   ├── personas.js      # Persona and commitment option definitions
    │   └── workouts.js      # All workout and "The Reset" data
    ├── components/
    │   ├── BottomNav.jsx    # Fixed bottom tab bar (4 tabs)
    │   ├── EnergyCheckIn.jsx # Daily energy level selector
    │   ├── StreakBadge.jsx  # Circular streak display
    │   └── WorkoutCard.jsx  # Reusable workout listing card
    └── screens/
        ├── Welcome.jsx           # Splash / landing
        ├── PersonaSelect.jsx     # Onboarding step 1
        ├── CommitmentSelect.jsx  # Onboarding step 2
        ├── Home.jsx              # Main dashboard
        ├── WorkoutList.jsx       # Browse all workouts
        ├── WorkoutPlayer.jsx     # Active workout execution
        ├── PauseScreen.jsx       # Workout paused state
        ├── WorkoutComplete.jsx   # Post-workout celebration
        ├── ResetPlayer.jsx       # "The Reset" 5-min routine player
        ├── ResetPauseScreen.jsx  # The Reset paused state
        ├── ResetComplete.jsx     # The Reset completion
        ├── Progress.jsx          # Streak + weekly goal + history
        └── Settings.jsx          # Persona, goal, preferences, reset
```

---

## Development Commands

```bash
npm run dev       # Start Vite dev server (hot reload)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

There is **no test command** — no testing framework is installed.

---

## Routing

Defined in `src/App.jsx`. All routes are protected by `GuardedRoute`, which redirects to `/` if `onboardingComplete` is false.

| Path | Screen | Notes |
|---|---|---|
| `/` | Welcome | Accessible pre-onboarding; auto-redirects to `/home` if complete |
| `/onboarding/persona` | PersonaSelect | Step 1 |
| `/onboarding/commitment` | CommitmentSelect | Step 2; sets `onboardingComplete` |
| `/home` | Home | Main dashboard |
| `/workouts` | WorkoutList | All 5 workouts |
| `/workout/:id` | WorkoutPlayer | Active session |
| `/workout/:id/paused` | PauseScreen | Paused session |
| `/workout/:id/complete` | WorkoutComplete | Completion |
| `/reset` | ResetPlayer | "The Reset" player |
| `/reset/paused` | ResetPauseScreen | Reset paused |
| `/reset/complete` | ResetComplete | Reset done |
| `/progress` | Progress | Streak + history |
| `/settings` | Settings | Preferences |

---

## State Management

All state lives in `src/context/AppContext.jsx` via `useReducer` with `localStorage` persistence (key: `"wellparent_state"`).

### State Shape

```js
{
  persona: null,                  // "dad" | "mom" | "caregiver" | "other"
  weeklyGoal: null,               // "2x" | "3x" | "4x"
  onboardingComplete: false,
  activeWorkout: null,            // { id, startedAt, pausedAt, totalPauseDuration, exerciseIndex, setIndex, status }
  completedWorkouts: [],          // [{ id, completedAt, activeDuration, wasPaused }]
  energyToday: null,              // "low" | "medium" | "high"
  energyDate: null,               // ISO date string; used to limit check-in to once/day
  energyCheckInEnabled: true,
  currentStreak: 0
}
```

### Dispatch Actions

| Action | Purpose |
|---|---|
| `SET_PERSONA` | Set user persona |
| `SET_WEEKLY_GOAL` | Set weekly workout goal |
| `COMPLETE_ONBOARDING` | Mark onboarding done |
| `START_WORKOUT` | Begin a workout session |
| `PAUSE_WORKOUT` | Pause with timestamp |
| `RESUME_WORKOUT` | Resume, accumulate pause time |
| `COMPLETE_WORKOUT` | Record completion + update streak |
| `ABANDON_WORKOUT` | Clear active workout state |
| `SET_ENERGY` | Set today's energy level |
| `SET_ENERGY_CHECKIN_ENABLED` | Toggle energy check-in |
| `RESET_DATA` | Clear all app data |

### Consuming Context

```jsx
import { useApp } from '../context/AppContext';

const { state, dispatch, capture } = useApp();
```

The `capture()` utility wraps PostHog event tracking with a try/catch.

---

## Design System

Custom design tokens defined in `tailwind.config.js`:

| Token | Hex | Usage |
|---|---|---|
| `forest` | `#1C4A3E` | Primary dark green (backgrounds, nav) |
| `terra` | `#C4623A` | Accent orange/terracotta (The Reset, CTAs) |
| `sage` | `#7AAF96` | Muted green (secondary elements) |
| `cream` | `#FAF7F2` | Off-white background |
| `ink` | `#1A2420` | Near-black body text |
| `mist` | `#9DB8AE` | Soft gray-green (inactive states) |

**Fonts** (loaded from Google Fonts in `index.html`):
- **Playfair Display** — serif, for headings
- **DM Sans** — sans-serif, for body and UI

**Custom animations** defined in `src/index.css`:
- `breathe` — pulsing scale for pause screens
- `checkmark` — SVG stroke reveal for completion
- `fadeInUp` — enter transition
- `confetti` — falling celebration dots
- `press-fill` — long-press ring indicator (500ms, triggers pause)
- `countdown-ring` — SVG stroke countdown for timed exercises

---

## Workout Data (`src/data/workouts.js`)

Each workout has:
- `id`, `name`, `duration` (minutes), `level`, `equipment`, `isPostpartumSafe`
- `exercises[]`: each with `name`, `type` (`"timed"` or `"reps"`), and timing/rep info

**Workouts:**
1. `nap-window` — 15 min, beginner
2. `after-bedtime` — 20 min, moderate
3. `morning-10` — 10 min, beginner
4. `carry-heavy-things` — 25 min, moderate, optional dumbbells
5. `postpartum-strong` — 15 min, postpartum-safe

**The Reset** (`theReset`) is a separate 5-min stress-relief routine (8 exercises, all timed). It has its own player, pause, and complete screens under `/reset`.

---

## Analytics (PostHog)

PostHog is loaded via inline script in `index.html`. Key is hardcoded there.

Use `capture(eventName, properties?)` from `useApp()` to fire events throughout the app. Events currently tracked:

`app_opened`, `persona_selected`, `commitment_set`, `home_viewed`, `workout_list_viewed`, `workout_started`, `workout_resumed`, `workout_paused`, `workout_completed`, `workout_abandoned`, `progress_viewed`, `pause_screen_viewed`, `reset_started`, `reset_resumed`, `reset_paused`, `reset_completed`, `energy_checked_in`

---

## Code Conventions

### Naming
- **Components/screens**: PascalCase filenames (`WorkoutCard.jsx`)
- **Variables/functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE (`STORAGE_KEY`, `PAUSE_RING_RADIUS`)
- **Context hook**: `useApp()`

### Component Patterns
- Functional components with hooks only (no class components)
- One component per file
- Screens (`/screens`) = full-page views with routing
- Components (`/components`) = reusable UI pieces
- Use `useCallback` for functions passed to child components or used in effects
- Use `useRef` for values that should not trigger re-renders (e.g., pause timestamps)
- Isolate timer/animation sub-components (e.g., `CountdownTimer`) to prevent parent re-renders

### Styling
- Tailwind utility classes preferred
- Custom animations go in `src/index.css` as `@keyframes`
- Inline styles only for dynamic values (e.g., colors that need runtime computation)
- Mobile-first; max container width is `430px`
- Minimum tap target size: 44–56px height

### Accessibility / Mobile UX
- Add `touch-none` and `select-none` on interactive elements to prevent selection on tap
- Use pointer event handlers (`onPointerDown`, `onPointerUp`) for cross-device compatibility
- Emoji are used as visual language support throughout (intentional)

---

## Known Gaps / Out of Scope for MVP

- No backend or API
- No user authentication (Sign In is "Coming soon")
- No test suite (no Jest, Vitest, etc.)
- No CI/CD pipeline
- No TypeScript (type definitions only used for IDE support)
- No environment variable system (`.env`) — PostHog key is hardcoded
- No error boundaries
- No service worker or offline support beyond `localStorage`
- One-Hand Mode setting is a non-functional placeholder

---

## Important Files Reference

| File | Purpose |
|---|---|
| `src/App.jsx` | All routes and `GuardedRoute` logic |
| `src/context/AppContext.jsx` | All state, reducer, and `capture()` utility |
| `src/data/workouts.js` | Workout and exercise definitions |
| `src/data/personas.js` | Persona and commitment options |
| `tailwind.config.js` | Color tokens and font family config |
| `src/index.css` | Global styles + all custom @keyframes |
| `index.html` | App shell, Google Fonts, PostHog init |
