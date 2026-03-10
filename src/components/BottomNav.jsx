import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/home', label: 'Home', icon: HomeIcon },
  { path: '/workouts', label: 'Workouts', icon: WorkoutIcon },
  { path: '/mind', label: 'Mind', icon: MindIcon },
  { path: '/progress', label: 'Progress', icon: ProgressIcon },
  { path: '/settings', label: 'You', icon: YouIcon },
];

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 9.5L11 3L19 9.5V19C19 19.55 18.55 20 18 20H14V14H8V20H4C3.45 20 3 19.55 3 19V9.5Z"
        stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill={active ? '#1C4A3E' : 'none'} fillOpacity={active ? 0.1 : 0}
      />
    </svg>
  );
}

function WorkoutIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M7 11H15M4 11H2M20 11H18M7 7L5 9M15 7L17 9M7 15L5 13M15 15L17 13"
        stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8" strokeLinecap="round"
      />
      <circle cx="11" cy="11" r="3" stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8"
        fill={active ? '#1C4A3E' : 'none'} fillOpacity={active ? 0.1 : 0}
      />
    </svg>
  );
}

function MindIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3C7.13 3 4 6.13 4 10c0 2.46 1.25 4.63 3.15 5.93V18h7.7v-2.07C16.75 14.63 18 12.46 18 10c0-3.87-3.13-7-7-7z"
        stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill={active ? '#1C4A3E' : 'none'} fillOpacity={active ? 0.08 : 0}
      />
      <path d="M8 18h6M9 21h4"
        stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8" strokeLinecap="round"
      />
    </svg>
  );
}

function ProgressIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 17L8 11L12 14L17 8M19 17H3"
        stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function YouIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3.5" stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8"
        fill={active ? '#1C4A3E' : 'none'} fillOpacity={active ? 0.1 : 0}
      />
      <path d="M4 19c0-3.87 3.13-7 7-7s7 3.13 7 7"
        stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8" strokeLinecap="round"
      />
    </svg>
  );
}

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-cream border-t border-mist/20 flex z-40">
      {tabs.map(tab => {
        const active = location.pathname === tab.path || location.pathname.startsWith(tab.path + '/');
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex-1 flex flex-col items-center gap-1 py-3 min-h-[56px] transition-colors"
          >
            <Icon active={active} />
            <span className={`font-dm text-xs font-medium ${active ? 'text-forest' : 'text-mist'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
