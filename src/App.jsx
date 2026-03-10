import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Onboarding
import Welcome from './screens/Welcome';
import PersonaSelect from './screens/PersonaSelect';
import GoalsBarriers from './screens/GoalsBarriers';
import EquipmentSafety from './screens/EquipmentSafety';
import CommitmentSelect from './screens/CommitmentSelect';
import FirstWorkoutWelcome from './screens/FirstWorkoutWelcome';

// Main tabs
import Home from './screens/Home';
import WorkoutList from './screens/WorkoutList';
import MindScreen from './screens/MindScreen';
import Progress from './screens/Progress';
import Settings from './screens/Settings';

// Workout flows
import WorkoutPreview from './screens/WorkoutPreview';
import WorkoutPlayer from './screens/WorkoutPlayer';
import PauseScreen from './screens/PauseScreen';
import WorkoutComplete from './screens/WorkoutComplete';

// Reset flows
import ResetPlayer from './screens/ResetPlayer';
import ResetComplete from './screens/ResetComplete';
import ResetPauseScreen from './screens/ResetPauseScreen';

// Mind flows
import BreathingPlayer from './screens/BreathingPlayer';
import JournalPrompt from './screens/JournalPrompt';

// Profile / subscription
import Paywall from './screens/Paywall';

// Phase 2
import SmartReminders from './screens/SmartReminders';
import ReEngagement from './screens/ReEngagement';
import PulseSurvey from './screens/PulseSurvey';
import AIInsight from './screens/AIInsight';
import CommunitySpace from './screens/CommunitySpace';
import WearableConnect from './screens/WearableConnect';

// Phase 3 stubs
import AICoach from './screens/AICoach';
import CoachBooking from './screens/CoachBooking';
import EducationHub from './screens/EducationHub';
import FamilyPlan from './screens/FamilyPlan';
import CorporatePortal from './screens/CorporatePortal';

const ONBOARDING_PATHS = [
  '/onboarding/persona',
  '/onboarding/goals',
  '/onboarding/equipment',
  '/onboarding/commitment',
  '/onboarding/welcome',
];

function GuardedRoute({ children }) {
  const { state } = useApp();
  const location = useLocation();
  if (!state.onboardingComplete && !ONBOARDING_PATHS.includes(location.pathname) && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Splash */}
      <Route path="/" element={<Welcome />} />

      {/* Onboarding (4 steps + welcome) */}
      <Route path="/onboarding/persona" element={<PersonaSelect />} />
      <Route path="/onboarding/goals" element={<GoalsBarriers />} />
      <Route path="/onboarding/equipment" element={<EquipmentSafety />} />
      <Route path="/onboarding/commitment" element={<CommitmentSelect />} />
      <Route path="/onboarding/welcome" element={<FirstWorkoutWelcome />} />

      {/* Main tabs */}
      <Route path="/home" element={<GuardedRoute><Home /></GuardedRoute>} />
      <Route path="/workouts" element={<GuardedRoute><WorkoutList /></GuardedRoute>} />
      <Route path="/mind" element={<GuardedRoute><MindScreen /></GuardedRoute>} />
      <Route path="/progress" element={<GuardedRoute><Progress /></GuardedRoute>} />
      <Route path="/settings" element={<GuardedRoute><Settings /></GuardedRoute>} />

      {/* Workout flows */}
      <Route path="/workout/:id/preview" element={<GuardedRoute><WorkoutPreview /></GuardedRoute>} />
      <Route path="/workout/:id" element={<GuardedRoute><WorkoutPlayer /></GuardedRoute>} />
      <Route path="/workout/:id/paused" element={<GuardedRoute><PauseScreen /></GuardedRoute>} />
      <Route path="/workout/:id/complete" element={<GuardedRoute><WorkoutComplete /></GuardedRoute>} />

      {/* Reset flows */}
      <Route path="/reset" element={<GuardedRoute><ResetPlayer /></GuardedRoute>} />
      <Route path="/reset/paused" element={<GuardedRoute><ResetPauseScreen /></GuardedRoute>} />
      <Route path="/reset/complete" element={<GuardedRoute><ResetComplete /></GuardedRoute>} />

      {/* Mind flows */}
      <Route path="/mind/breathing/:id" element={<GuardedRoute><BreathingPlayer /></GuardedRoute>} />
      <Route path="/mind/journal" element={<GuardedRoute><JournalPrompt /></GuardedRoute>} />

      {/* Subscription */}
      <Route path="/subscribe" element={<GuardedRoute><Paywall /></GuardedRoute>} />

      {/* Phase 2 */}
      <Route path="/reminders" element={<GuardedRoute><SmartReminders /></GuardedRoute>} />
      <Route path="/re-engagement" element={<ReEngagement />} />
      <Route path="/pulse-survey" element={<GuardedRoute><PulseSurvey /></GuardedRoute>} />
      <Route path="/ai-insight" element={<GuardedRoute><AIInsight /></GuardedRoute>} />
      <Route path="/community" element={<GuardedRoute><CommunitySpace /></GuardedRoute>} />
      <Route path="/wearable" element={<GuardedRoute><WearableConnect /></GuardedRoute>} />

      {/* Phase 3 stubs */}
      <Route path="/coach" element={<GuardedRoute><AICoach /></GuardedRoute>} />
      <Route path="/book-coach" element={<GuardedRoute><CoachBooking /></GuardedRoute>} />
      <Route path="/education" element={<GuardedRoute><EducationHub /></GuardedRoute>} />
      <Route path="/family-plan" element={<GuardedRoute><FamilyPlan /></GuardedRoute>} />
      <Route path="/corporate" element={<CorporatePortal />} />

      {/* Fallback */}
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
