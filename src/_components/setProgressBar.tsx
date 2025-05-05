interface SetProgressBarProps {
  sets: number[];
  currentSetIndex: number;
  progressToNext: number; // 0 à 1
  handleCurrentIndex: (n: number) => void;
}

export default function SetProgressBar({ sets, currentSetIndex, progressToNext, handleCurrentIndex }: SetProgressBarProps) {
  return (
    <div className="flex items-center justify-between w-full px-4">
      {sets.map((set, i) => (
        <div key={i} className="flex items-center" onClick={() => handleCurrentIndex(set)}>
          {/* Cercle du set */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i < currentSetIndex
              ? 'bg-black text-white'
              : 'bg-white text-black'
              }`}
          >
            {set}
          </div>
        </div>
      ))}
    </div>
  );
};
