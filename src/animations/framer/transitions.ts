export const pageTransition = {
  duration: 0.45,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 25,
};

export const springBouncy = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 15,
};

export const springGentle = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 30,
};

export const staggerDelay = 0.08;
export const cardHoverDelay = 0.05;
