import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIMES = ['6:00 AM', '7:00 AM', '8:00 AM', '12:00 PM', '5:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];

export default function SmartReminders() {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Wed', 'Fri']);
  const [selectedTime, setSelectedTime] = useState('7:00 AM');
  const [streakNudge, setStreakNudge] = useState(true);
  const [saved, setSaved] = useState(false);

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    capture('reminders_saved', { days: selectedDays, time: selectedTime, streakNudge });
    setSaved(true);
    setTimeout(() => navigate('/settings'), 800);
  };

  return (
    <div className="min-h-screen bg-cream pb-32">
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
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Phase 2 feature</p>
          <h1 className="font-playfair text-forest text-3xl font-bold leading-tight mb-2">
            Smart Reminders
          </h1>
          <p className="font-dm text-mist text-base">
            Gentle nudges, not guilt trips. Off by default for your first 7 days.
          </p>
        </div>

        {/* Days */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-4">Workout Days</p>
          <div className="flex gap-2 flex-wrap">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`w-11 h-11 rounded-full font-dm text-sm font-medium transition-all duration-200 ${
                  selectedDays.includes(day)
                    ? 'bg-forest text-cream'
                    : 'bg-mist/20 text-mist'
                }`}
              >
                {day[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-4">Reminder Time</p>
          <div className="grid grid-cols-4 gap-2">
            {TIMES.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2.5 rounded-xl font-dm text-xs font-medium transition-all duration-200 min-h-[44px] ${
                  selectedTime === time
                    ? 'bg-forest text-cream'
                    : 'bg-mist/20 text-mist'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Streak nudge */}
        <div className="bg-white/70 rounded-2xl border border-mist/20 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-dm text-ink font-medium text-base mb-1">Streak nudge</p>
              <p className="font-dm text-mist text-sm leading-relaxed">
                "You're 1 workout from your goal this week." Sent when you're close.
              </p>
            </div>
            <button
              onClick={() => setStreakNudge(s => !s)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 ${
                streakNudge ? 'bg-forest' : 'bg-mist/30'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform duration-200 ${streakNudge ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-forest/5 border border-forest/15 rounded-2xl p-4">
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Preview</p>
          <p className="font-dm text-forest text-sm italic">
            "Your Reset is ready. {selectedTime}. No pressure — just here when you are."
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-8 pt-4 bg-cream/90 backdrop-blur-sm border-t border-mist/10">
        <button
          onClick={handleSave}
          className={`w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] transition-all duration-200 ${
            saved ? 'bg-sage text-forest' : 'bg-forest text-cream active:scale-95'
          }`}
        >
          {saved ? 'Saved ✓' : 'Save Reminders'}
        </button>
      </div>
    </div>
  );
}
