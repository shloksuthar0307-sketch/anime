import { motion } from 'framer-motion';

interface MoodCardProps {
  id: string;
  emoji: string;
  label: string;
  color: string;
  selected?: boolean;
  onClick: () => void;
}

export default function MoodCard({ emoji, label, color, selected = false, onClick }: MoodCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        flex flex-col items-center justify-center gap-2 p-4 rounded-card
        border transition-all duration-300 min-w-[100px]
        ${selected
          ? 'border-current shadow-lg'
          : 'border-glass-border hover:border-current/50'
        }
      `}
      style={{
        color,
        borderColor: selected ? color : undefined,
        boxShadow: selected ? `0 0 20px ${color}40, 0 0 40px ${color}20` : undefined,
        background: selected ? `${color}15` : 'var(--glass-bg)',
      }}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-xs font-display font-semibold tracking-wider uppercase">{label}</span>
    </motion.button>
  );
}
