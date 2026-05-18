import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface NeonToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

const typeConfig = {
  success: { icon: CheckCircle, color: 'text-green-400', border: 'border-green-500/30' },
  error: { icon: AlertCircle, color: 'text-red-400', border: 'border-red-500/30' },
  info: { icon: Info, color: 'text-neon-cyan', border: 'border-neon-cyan/30' },
};

export default function NeonToast({ message, type = 'info', visible, onClose, duration = 3000 }: NeonToastProps) {
  const [show, setShow] = useState(visible);
  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    setShow(visible);
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className={`fixed top-4 right-4 z-[100] flex items-center gap-3 px-4 py-3 rounded-card glass-card border ${config.border} max-w-sm`}
        >
          <Icon className={`w-5 h-5 ${config.color} flex-shrink-0`} />
          <span className="text-sm text-text-primary">{message}</span>
          <button onClick={() => { setShow(false); onClose(); }} className="text-text-muted hover:text-text-primary ml-2">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
