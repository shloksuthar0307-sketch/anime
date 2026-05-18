import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User, LogOut, Bookmark, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUIStore } from '../../store/useUIStore';
import NeonButton from '../ui/NeonButton';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/mood', label: 'Mood' },
  { to: '/ai-recommend', label: 'AI', icon: Sparkles },
  { to: '/quiz', label: 'Quiz' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { closeSidebar } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'bg-void/90 backdrop-blur-xl border-b border-glass-border shadow-lg shadow-void/50' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-cyber bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center group-hover:shadow-neon-cyan transition-all duration-300">
                <span className="text-neon-cyan font-display font-bold text-sm">A</span>
              </div>
              <span className="font-display font-bold text-lg gradient-text hidden sm:block">ARU</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-card text-sm font-display font-semibold tracking-wide transition-all duration-200
                    ${location.pathname === link.to
                      ? 'text-neon-cyan bg-neon-cyan/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-glass-bg'
                    }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-card text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/watchlist" className="p-2 rounded-card text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-200">
                    <Bookmark className="w-4 h-4" />
                  </Link>
                  <Link to="/profile" className="p-2 rounded-card text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-200">
                    <User className="w-4 h-4" />
                  </Link>
                  <button onClick={() => signOut()} className="p-2 rounded-card text-text-secondary hover:text-neon-pink hover:bg-neon-pink/10 transition-all duration-200">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link to="/auth">
                  <NeonButton size="sm">Sign In</NeonButton>
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-card text-text-secondary hover:text-neon-cyan transition-all duration-200"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-glass-border"
            >
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search anime..."
                    className="w-full bg-void-surface/50 border border-glass-border rounded-card pl-10 pr-4 py-2.5 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300"
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-void/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <div className="relative flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 text-xl font-display font-bold tracking-wider
                    ${location.pathname === link.to ? 'text-neon-cyan' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/watchlist" className="text-xl font-display font-bold text-text-secondary hover:text-neon-cyan">Watchlist</Link>
                  <Link to="/profile" className="text-xl font-display font-bold text-text-secondary hover:text-neon-cyan">Profile</Link>
                </>
              ) : (
                <Link to="/auth" className="text-xl font-display font-bold text-neon-cyan">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
