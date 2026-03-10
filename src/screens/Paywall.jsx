import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const FEATURES = [
  { label: 'The Reset (always)', free: true },
  { label: '1 workout preview per week', free: true },
  { label: 'Full workout library (12+)', free: false },
  { label: 'Mind tab — breathing & journal', free: false },
  { label: 'Progress tracking & streaks', free: false },
  { label: 'Energy check-in & recommendations', free: false },
  { label: 'AI insights (after week 1)', free: false },
  { label: 'Offline access to all content', free: false },
  { label: 'Community access', free: false },
  { label: 'Smart reminders', free: false },
];

export default function Paywall() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState('annual');
  const [loading, setLoading] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    capture('wellparent_paywall_viewed', { trigger_screen: 'settings' });
  }, []);

  const handleSubscribe = () => {
    setLoading(true);
    capture('wellparent_subscription_started', { plan, source_screen: 'paywall' });
    setTimeout(() => {
      setLoading(false);
      setActivated(true);
      setTimeout(() => navigate('/home'), 1500);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col pb-32">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-mist font-dm text-sm flex items-center gap-1 min-h-[44px] px-2 -ml-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10L13 4" stroke="#9DB8AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      <div className="px-5 flex flex-col gap-6">
        {/* Hero */}
        <div className="text-center py-4">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-3">WellParent Premium</p>
          <h1 className="font-playfair text-forest text-3xl font-bold leading-tight mb-3">
            Everything you need.<br />
            <span className="italic">When you actually have a moment.</span>
          </h1>
        </div>

        {/* Plan toggle */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-1.5 flex gap-1">
          <button
            onClick={() => setPlan('monthly')}
            className={`flex-1 py-3 rounded-xl font-dm font-medium text-sm transition-all duration-200 min-h-[48px] ${
              plan === 'monthly' ? 'bg-forest text-cream' : 'text-mist'
            }`}
          >
            Monthly
            <span className="block text-xs opacity-70 mt-0.5">$9.99 / month</span>
          </button>
          <button
            onClick={() => setPlan('annual')}
            className={`flex-1 py-3 rounded-xl font-dm font-medium text-sm transition-all duration-200 min-h-[48px] relative ${
              plan === 'annual' ? 'bg-forest text-cream' : 'text-mist'
            }`}
          >
            Annual
            <span className="block text-xs opacity-70 mt-0.5">$79 / year</span>
            {plan !== 'annual' && (
              <span className="absolute -top-2 right-2 bg-sage text-forest font-dm text-xs font-semibold px-2 py-0.5 rounded-full">
                Save 34%
              </span>
            )}
          </button>
        </div>

        {/* Feature comparison */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 overflow-hidden">
          <div className="grid grid-cols-3 gap-0 px-4 py-3 border-b border-mist/10">
            <p className="col-span-2 font-dm text-mist text-xs uppercase tracking-widest font-semibold">Feature</p>
            <div className="flex gap-4 justify-end">
              <p className="font-dm text-mist text-xs font-semibold">Free</p>
              <p className="font-dm text-forest text-xs font-semibold">Pro</p>
            </div>
          </div>
          {FEATURES.map((f, i) => (
            <div key={i} className="grid grid-cols-3 gap-0 px-4 py-3 border-b border-mist/10 last:border-0">
              <p className="col-span-2 font-dm text-ink text-sm">{f.label}</p>
              <div className="flex gap-4 justify-end items-center">
                <span className="text-base">{f.free ? '✓' : '·'}</span>
                <span className="text-base text-forest font-semibold">✓</span>
              </div>
            </div>
          ))}
        </div>

        <p className="font-dm text-mist text-xs text-center leading-relaxed">
          Cancel any time. No questions, no guilt.
        </p>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-8 pt-4 bg-cream/90 backdrop-blur-sm border-t border-mist/10">
        <button
          onClick={handleSubscribe}
          disabled={loading || activated}
          className={`w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] transition-all duration-200 ${
            activated
              ? 'bg-sage text-forest'
              : loading
              ? 'bg-forest/50 text-cream/50'
              : 'bg-forest text-cream active:scale-95'
          }`}
        >
          {activated
            ? 'Premium activated (demo) ✓'
            : loading
            ? 'Starting...'
            : `Start ${plan === 'annual' ? 'Annual' : 'Monthly'} Plan`}
        </button>
      </div>
    </div>
  );
}
