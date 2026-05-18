import { Star } from 'lucide-react';

interface RatingBadgeProps {
  score: number | null;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { star: 'w-3 h-3', text: 'text-xs', px: 'px-1.5 py-0.5' },
  md: { star: 'w-4 h-4', text: 'text-sm', px: 'px-2 py-1' },
  lg: { star: 'w-5 h-5', text: 'text-base', px: 'px-3 py-1.5' },
};

export default function RatingBadge({ score, size = 'md' }: RatingBadgeProps) {
  if (score == null) return null;
  const s = sizeMap[size];
  const color = score >= 8 ? 'text-neon-gold' : score >= 6 ? 'text-neon-cyan' : 'text-text-secondary';
  return (
    <div className={`inline-flex items-center gap-1 bg-void/80 backdrop-blur-sm rounded-card ${s.px}`}>
      <Star className={`${s.star} ${color} fill-current`} />
      <span className={`${s.text} font-mono font-bold ${color}`}>{score.toFixed(1)}</span>
    </div>
  );
}
