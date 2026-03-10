import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capture } from '../context/AppContext';

const QUESTIONS = [
  {
    id: 'fit',
    text: 'How well does WellParent fit your schedule?',
    labels: ['Not at all', 'A little', 'Somewhat', 'Pretty well', 'Perfectly'],
  },
  {
    id: 'improve',
    text: 'What would make it work better for you?',
    labels: ['More variety', 'Shorter workouts', 'Better timing', 'More guidance', 'Nothing — it works'],
  },
  {
    id: 'change',
    text: "What's one thing you'd change?",
    labels: ['The copy', 'The design', 'The workouts', 'The reminders', 'Nothing'],
  },
];

export default function PulseSurvey() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);

  const handleSubmit = () => {
    capture('pulse_survey_submitted', { answers, day: 7 });
    setSubmitted(true);
    setTimeout(() => navigate('/home'), 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center gap-6">
        <h1 className="font-playfair text-forest text-3xl font-bold italic">Thank you.</h1>
        <p className="font-dm text-mist text-lg">Your feedback shapes this.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-32">
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
        <div>
          <p className="font-dm text-mist text-xs uppercase tracking-widest font-semibold mb-2">Day 7 check-in</p>
          <h1 className="font-playfair text-forest text-3xl font-bold leading-tight mb-2">
            How's it going?
          </h1>
          <p className="font-dm text-mist text-base">
            Three quick questions. No wrong answers.
          </p>
        </div>

        {QUESTIONS.map((q, qi) => (
          <div key={q.id} className="bg-white/70 rounded-2xl border border-mist/20 p-5">
            <p className="font-dm text-ink font-medium text-base mb-4">
              {qi + 1}. {q.text}
            </p>
            <div className="flex flex-col gap-2">
              {q.labels.map((label, li) => {
                const isSelected = answers[q.id] === li;
                return (
                  <button
                    key={li}
                    onClick={() => setAnswers(a => ({ ...a, [q.id]: li }))}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 min-h-[52px] text-left ${
                      isSelected ? 'border-forest bg-forest/5' : 'border-mist/20 bg-white/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      isSelected ? 'border-forest bg-forest' : 'border-mist/40'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className={`font-dm text-sm ${isSelected ? 'text-forest font-medium' : 'text-ink'}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-8 pt-4 bg-cream/90 backdrop-blur-sm border-t border-mist/10">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full font-dm font-semibold text-lg rounded-full py-4 min-h-[56px] transition-all duration-200 ${
            allAnswered ? 'bg-forest text-cream active:scale-95' : 'bg-mist/30 text-mist cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
