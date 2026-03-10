import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

export default function WearableConnect() {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(null);
  const [connected, setConnected] = useState(null);

  const handleConnect = (device) => {
    setConnecting(device);
    capture('wearable_connect_tapped', { device });
    setTimeout(() => {
      setConnecting(null);
      setConnected(device);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/settings')}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      <div className="px-5 flex flex-col gap-6">
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Phase 2 Feature</p>
          <h1 className="font-playfair text-forest text-3xl font-bold mb-2">
            Connect Your Device
          </h1>
          <p className="font-dm text-mist text-base leading-relaxed">
            We only read what helps you — heart rate, active minutes, sleep quality. We never write to your health data.
          </p>
        </div>

        {/* Connect options */}
        <div className="flex flex-col gap-3">
          {[
            { id: 'apple', label: 'Apple Watch / Health', icon: '⌚' },
            { id: 'google', label: 'Google Fit', icon: '🏃' },
          ].map(device => (
            <button
              key={device.id}
              onClick={() => connected !== device.id && handleConnect(device.id)}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 min-h-[72px] text-left ${
                connected === device.id
                  ? 'border-forest bg-forest/5'
                  : 'border-mist/30 bg-white/70'
              }`}
            >
              <span className="text-3xl">{device.icon}</span>
              <div className="flex-1">
                <p className="font-dm font-semibold text-base text-ink">{device.label}</p>
                <p className="font-dm text-mist text-sm mt-0.5">
                  {connected === device.id
                    ? 'Connected (demo)'
                    : connecting === device.id
                    ? 'Connecting...'
                    : 'Tap to connect'}
                </p>
              </div>
              {connected === device.id && (
                <div className="w-6 h-6 rounded-full bg-forest flex items-center justify-center">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* What we read */}
        <div className="bg-forest/5 border border-forest/15 rounded-2xl p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">What we read</p>
          {['Heart rate (during workouts)', 'Active minutes (weekly)', 'Sleep quality (influences recommendations)'].map(item => (
            <div key={item} className="flex items-center gap-2 py-1">
              <span className="text-sage text-base">✓</span>
              <p className="font-dm text-ink text-sm">{item}</p>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-mist/10">
            <p className="font-dm text-mist text-xs leading-relaxed">
              We never write to your health data. Nothing is shared with third parties.
            </p>
          </div>
        </div>

        {/* Readiness score mock */}
        {connected && (
          <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
            <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Today's Readiness</p>
            <p className="font-playfair text-forest text-2xl font-bold italic mb-1">Steady day</p>
            <p className="font-dm text-mist text-sm leading-relaxed">
              Your body is signalling a medium-effort day today. The Baby Nap Window would fit well.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
