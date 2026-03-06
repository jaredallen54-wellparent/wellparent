import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/home', label: 'Home', icon: HomeIcon },
  { path: '/workouts', label: 'Workouts', icon: WorkoutIcon },
  { path: '/progress', label: 'Progress', icon: ProgressIcon },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
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

function ProgressIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 17L8 11L12 14L17 8M19 17H3"
        stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function SettingsIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="3" stroke={active ? '#1C4A3E' : '#9DB8AE'} strokeWidth="1.8"/>
      <path d="M11 2V4M11 18V20M2 11H4M18 11H20M4.22 4.22L5.64 5.64M16.36 16.36L17.78 17.78M4.22 17.78L5.64 16.36M16.36 5.64L17.78 4.22"
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
        const active = location.pathname === tab.path;
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
