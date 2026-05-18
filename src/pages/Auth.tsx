import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import NeonButton from '../components/ui/NeonButton';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card neon-border p-8"
    >
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-cyber bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center mx-auto mb-4 shadow-neon-cyan">
          <Zap className="w-7 h-7 text-neon-cyan" />
        </div>
        <h1 className="font-display font-bold text-2xl gradient-text">
          {isLogin ? 'Welcome Back' : 'Join the Universe'}
        </h1>
        <p className="text-text-muted text-sm mt-1">
          {isLogin ? 'Sign in to your ARU account' : 'Create your ARU account'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-card bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-display font-semibold text-text-secondary mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full bg-void-surface/50 border border-glass-border rounded-card pl-10 pr-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-display font-semibold text-text-secondary mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Min 6 characters"
              className="w-full bg-void-surface/50 border border-glass-border rounded-card pl-10 pr-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all"
            />
          </div>
        </div>
        <NeonButton type="submit" variant="cyan" loading={loading} className="w-full">
          <span className="flex items-center justify-center gap-2">
            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
          </span>
        </NeonButton>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => { setIsLogin(!isLogin); setError(''); }}
          className="text-sm text-text-muted hover:text-neon-cyan transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </motion.div>
  );
}
