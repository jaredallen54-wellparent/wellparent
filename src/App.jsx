import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Welcome from './screens/Welcome';
import PersonaSelect from './screens/PersonaSelect';
import CommitmentSelect from './screens/CommitmentSelect';
import Home from './screens/Home';
import WorkoutList from './screens/WorkoutList';
import WorkoutPlayer from './screens/WorkoutPlayer';
import PauseScreen from './screens/PauseScreen';
import WorkoutComplete from './screens/WorkoutComplete';
import ResetPlayer from './screens/ResetPlayer';
import ResetComplete from './screens/ResetComplete';
import ResetPauseScreen from './screens/ResetPauseScreen';
import Progress from './screens/Progress';
import Settings from './screens/Settings';

function GuardedRoute({ children }) {
  const { state } = useApp();
  const location = useLocation();
  const onboarding = ['/onboarding/persona', '/onboarding/commitment'];
  if (!state.onboardingComplete && location.pathname !== '/' && !onboarding.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/onboarding/persona" element={<PersonaSelect />} />
      <Route path="/onboarding/commitment" element={<CommitmentSelect />} />
      <Route path="/home" element={<GuardedRoute><Home /></GuardedRoute>} />
      <Route path="/workouts" element={<GuardedRoute><WorkoutList /></GuardedRoute>} />
      <Route path="/workout/:id" element={<GuardedRoute><WorkoutPlayer /></GuardedRoute>} />
      <Route path="/workout/:id/paused" element={<GuardedRoute><PauseScreen /></GuardedRoute>} />
      <Route path="/workout/:id/complete" element={<GuardedRoute><WorkoutComplete /></GuardedRoute>} />
      <Route path="/reset" element={<GuardedRoute><ResetPlayer /></GuardedRoute>} />
      <Route path="/reset/paused" element={<GuardedRoute><ResetPauseScreen /></GuardedRoute>} />
      <Route path="/reset/complete" element={<GuardedRoute><ResetComplete /></GuardedRoute>} />
      <Route path="/progress" element={<GuardedRoute><Progress /></GuardedRoute>} />
      <Route path="/settings" element={<GuardedRoute><Settings /></GuardedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
