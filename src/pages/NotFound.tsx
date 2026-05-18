import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import NeonButton from '../components/ui/NeonButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-6"
        >
          <span className="font-display font-bold gradient-text">404</span>
        </motion.div>
        <h1 className="font-display font-bold text-2xl text-text-primary mb-2">Lost in the Void</h1>
        <p className="text-text-muted text-sm mb-2">This page has vanished into another dimension</p>
        <p className="text-text-muted text-xs font-mono mb-8">
          Even Totoro could not find this page...
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/">
            <NeonButton variant="cyan">
              <span className="flex items-center gap-2"><Home className="w-4 h-4" /> Go Home</span>
            </NeonButton>
          </Link>
          <Link to="/explore">
            <NeonButton variant="purple">
              <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Explore</span>
            </NeonButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
