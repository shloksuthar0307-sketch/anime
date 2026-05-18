import { motion } from 'framer-motion';
import { cardVariants } from '../../animations/framer/variants';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  neonBorder?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  neonBorder = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      variants={hover ? cardVariants : undefined}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
      className={`
        glass-card p-4
        ${neonBorder ? 'neon-border' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
