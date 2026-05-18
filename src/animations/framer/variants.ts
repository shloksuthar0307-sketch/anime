import type { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: { opacity: 0, scale: 0.97, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    filter: 'blur(8px)',
    transition: { duration: 0.3 },
  },
};

export const cardVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -8,
    transition: { type: 'spring', stiffness: 350, damping: 20 },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      '0 0 10px #00F5FF, 0 0 30px rgba(0,245,255,0.3)',
      '0 0 25px #00F5FF, 0 0 60px rgba(0,245,255,0.5)',
      '0 0 10px #00F5FF, 0 0 30px rgba(0,245,255,0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const hologramFlicker: Variants = {
  animate: {
    opacity: [1, 0.85, 1, 0.9, 1],
    transition: { duration: 3, repeat: Infinity, times: [0, 0.2, 0.5, 0.8, 1] },
  },
};

export const slideInFromRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
