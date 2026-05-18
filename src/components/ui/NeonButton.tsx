import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface NeonButtonProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'pink' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

const variantStyles = {
  cyan: {
    border: 'border-neon-cyan',
    text: 'text-neon-cyan',
    glow: 'hover:shadow-neon-cyan',
    bg: 'hover:bg-neon-cyan/10',
  },
  purple: {
    border: 'border-neon-purple',
    text: 'text-neon-purple',
    glow: 'hover:shadow-neon-purple',
    bg: 'hover:bg-neon-purple/10',
  },
  pink: {
    border: 'border-neon-pink',
    text: 'text-neon-pink',
    glow: 'hover:shadow-neon-pink',
    bg: 'hover:bg-neon-pink/10',
  },
  gold: {
    border: 'border-neon-gold',
    text: 'text-neon-gold',
    glow: 'hover:shadow-neon-gold',
    bg: 'hover:bg-neon-gold/10',
  },
};

const sizeStyles = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

export default function NeonButton({
  children,
  variant = 'cyan',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: NeonButtonProps) {
  const v = variantStyles[variant];
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative font-display font-semibold tracking-wider uppercase
        border ${v.border} ${v.text} ${v.bg} ${v.glow}
        ${sizeStyles[size]}
        rounded-cyber transition-all duration-300
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : children}
    </motion.button>
  );
}
