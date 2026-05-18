import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface HologramModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function HologramModal({ isOpen, onClose, children, title }: HologramModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass-card neon-border p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto pointer-events-auto">
              {title && (
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-lg gradient-text">{title}</h2>
                  <button onClick={onClose} className="text-text-muted hover:text-neon-cyan transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
