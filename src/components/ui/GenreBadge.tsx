interface GenreBadgeProps {
  genre: string;
  active?: boolean;
  onClick?: () => void;
}

const genreColors: Record<string, string> = {
  Action: 'bg-red-500/20 text-red-400 border-red-500/30',
  Adventure: 'bg-green-500/20 text-green-400 border-green-500/30',
  Comedy: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Drama: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Fantasy: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Horror: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  Mystery: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  Romance: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Sci-Fi': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Slice of Life': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Sports: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Supernatural: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  Thriller: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  Music: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  Mecha: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export default function GenreBadge({ genre, active = false, onClick }: GenreBadgeProps) {
  const colorClass = genreColors[genre] || 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30';
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 rounded-full text-xs font-mono font-semibold border
        transition-all duration-200
        ${colorClass}
        ${active ? 'ring-2 ring-current scale-105' : 'opacity-70 hover:opacity-100'}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      {genre}
    </button>
  );
}
