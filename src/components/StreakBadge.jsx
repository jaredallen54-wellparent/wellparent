export default function StreakBadge({ streak }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-32 h-32 rounded-full bg-forest/10 border-4 border-forest/20 flex flex-col items-center justify-center mb-3">
        <span className="font-playfair text-forest text-5xl font-bold leading-none">
          {streak}
        </span>
      </div>
      <p className="font-dm text-forest font-semibold text-lg">days showing up</p>
      <p className="font-dm text-mist text-sm mt-1">Pauses don't break streaks.</p>
    </div>
  );
}
