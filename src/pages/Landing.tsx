import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, ArrowRight, TrendingUp, Zap, Users, Film, ChevronRight } from 'lucide-react';
import { useTrending, useSeasonal } from '../hooks/useAnime';
import { useMoodAnime } from '../hooks/useAnime';
import { useMoodStore } from '../store/useMoodStore';
import { MOODS, MOOD_GENRES } from '../utils/constants';
import AnimeCard from '../components/ui/AnimeCard';
import MoodCard from '../components/ui/MoodCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import NeonButton from '../components/ui/NeonButton';
import PageWrapper from '../components/layout/PageWrapper';

const HeroPortal = lazy(() => import('../three/scenes/HeroPortal'));
const AIOrb = lazy(() => import('../three/scenes/AIOrb'));

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'backOut' }}
        className="mb-8"
      >
        <div className="w-20 h-20 rounded-cyber border-2 border-neon-cyan flex items-center justify-center shadow-neon-cyan">
          <span className="font-display font-bold text-3xl gradient-text">A</span>
        </div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="font-display font-bold text-xl sm:text-2xl gradient-text mb-6 text-center"
      >
        ANIME RECOMMENDATION UNIVERSE
      </motion.h1>
      <div className="w-48 h-1 bg-void-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-xs text-text-muted font-mono"
      >
        Initializing universe...
      </motion.p>
    </motion.div>
  );
}

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {!isMobile && (
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-void-deep via-void to-void-dark" />}>
          <HeroPortal />
        </Suspense>
      )}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-void to-neon-purple/5" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void z-[1]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-neon-cyan font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-4"
        >
          AI-Powered Discovery
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6"
        >
          <span className="text-text-primary">Discover Your</span>
          <br />
          <span className="gradient-text">Universe</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-8"
        >
          Feel Every Frame. Let AI guide you through 50,000+ anime titles based on your mood, taste, and soul.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Link to="/explore">
            <NeonButton variant="cyan" size="lg">
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4" /> Start Exploring
              </span>
            </NeonButton>
          </Link>
          <Link to="/quiz">
            <NeonButton variant="purple" size="lg">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Take Personality Quiz
              </span>
            </NeonButton>
          </Link>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              window.location.href = `/explore?q=${encodeURIComponent(searchQuery.trim())}`;
            }
          }}
          className="relative max-w-lg mx-auto"
        >
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anime by title..."
            className="w-full bg-void/60 backdrop-blur-xl border border-glass-border rounded-full pl-12 pr-4 py-3 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300"
          />
          <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-cyan animate-glow-pulse" />
        </motion.form>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-text-muted rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-neon-cyan rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function TrendingSection() {
  const { data: trending, isLoading } = useTrending();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="w-5 h-5 text-neon-cyan" />
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">Now Trending</h2>
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-red-400">LIVE</span>
        </span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : trending?.map((anime: any, i: number) => (
              <div key={anime.mal_id} className="flex-shrink-0 w-[180px] sm:w-[200px]">
                <AnimeCard anime={anime} index={i} />
              </div>
            ))
        }
      </div>
    </section>
  );
}

function MoodFilterSection() {
  const { selectedMood, setMood } = useMoodStore();
  const { data: moodAnime, isLoading } = useMoodAnime(
    selectedMood ? MOOD_GENRES[selectedMood]?.jikanIds || null : null
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-2">How Are You Feeling?</h2>
      <p className="text-text-secondary text-sm mb-8">Select your mood and discover anime that matches your vibe</p>

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-8">
        {MOODS.map((mood) => (
          <MoodCard
            key={mood.id}
            id={mood.id}
            emoji={mood.emoji}
            label={mood.label}
            color={mood.color}
            selected={selectedMood === mood.id}
            onClick={() => setMood(selectedMood === mood.id ? null : mood.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm text-text-muted font-mono mb-4">
              Showing: {MOOD_GENRES[selectedMood]?.label}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {isLoading
                ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
                : moodAnime?.map((anime: any, i: number) => (
                    <AnimeCard key={anime.mal_id} anime={anime} index={i} />
                  ))
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function AIShowcaseSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-neon-cyan font-mono text-xs tracking-[0.2em] uppercase mb-3">Powered by AI</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-4">
            Your Personal <span className="gradient-text">Anime Oracle</span>
          </h2>
          <p className="text-text-secondary text-base mb-6">
            Tell ARU your mood, your favorites, and what moves you. Our AI analyzes thousands of titles to find hidden gems and perfect matches you never knew existed.
          </p>
          <div className="space-y-3 mb-8">
            {['Mood-based matching', 'Hidden gem discovery', 'Emotional resonance scoring', 'Personalized reasons for each pick'].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                <span className="text-sm text-text-secondary">{feature}</span>
              </motion.div>
            ))}
          </div>
          <Link to="/ai-recommend">
            <NeonButton variant="cyan">
              <span className="flex items-center gap-2">
                Try AI Recommendations <ArrowRight className="w-4 h-4" />
              </span>
            </NeonButton>
          </Link>
        </div>
        <div className="h-[300px] sm:h-[400px]">
          <Suspense fallback={<div className="w-full h-full glass-card rounded-card flex items-center justify-center"><Sparkles className="w-8 h-8 text-neon-cyan animate-pulse" /></div>}>
            <AIOrb />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function SeasonalSection() {
  const { data: seasonal, isLoading } = useSeasonal();
  const currentSeason = (() => {
    const month = new Date().getMonth();
    if (month <= 2) return 'Winter';
    if (month <= 5) return 'Spring';
    if (month <= 8) return 'Summer';
    return 'Fall';
  })();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
            {currentSeason} {new Date().getFullYear()}
          </h2>
          <p className="text-text-secondary text-sm mt-1">This season's hottest anime</p>
        </div>
        <Link to="/explore" className="flex items-center gap-1 text-neon-cyan text-sm font-display font-semibold hover:gap-2 transition-all">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : seasonal?.slice(0, 10).map((anime: any, i: number) => (
              <AnimeCard key={anime.mal_id} anime={anime} index={i} />
            ))
        }
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { icon: Film, value: 50000, suffix: '+', label: 'Anime Titles' },
    { icon: Users, value: 800000, suffix: '+', label: 'Characters' },
    { icon: TrendingUp, value: 2000000, suffix: '+', label: 'Fans Worldwide' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-void via-void-dark to-void">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="text-center"
          >
            <stat.icon className="w-8 h-8 text-neon-cyan mx-auto mb-3" />
            <p className="font-display font-bold text-3xl sm:text-4xl gradient-text stat-number" data-target={stat.value}>
              0
            </p>
            <p className="text-text-muted text-sm font-mono mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function QuizCTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-purple/5" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-10 h-10 text-neon-purple mx-auto mb-4" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-4">
            What Anime Are <span className="neon-text-purple">You</span>?
          </h2>
          <p className="text-text-secondary text-base max-w-lg mx-auto mb-8">
            Take our personality quiz and discover which anime universe you truly belong to. Are you a shounen hero or a slice-of-life soul?
          </p>
          <Link to="/quiz">
            <NeonButton variant="purple" size="lg">
              <span className="flex items-center gap-2">
                Take the Quiz <ArrowRight className="w-4 h-4" />
              </span>
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Landing() {
  const [showPreloader, setShowPreloader] = useState(() => {
    return !sessionStorage.getItem('aru-visited');
  });

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    sessionStorage.setItem('aru-visited', 'true');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset.target || '0');
            if (target > 0 && !el.dataset.counted) {
              el.dataset.counted = 'true';
              const duration = 2000;
              const start = performance.now();
              const animate = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(target * eased).toLocaleString() + (el.dataset.suffix || '');
                if (progress < 1) requestAnimationFrame(animate);
              };
              requestAnimationFrame(animate);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.stat-number').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageWrapper>
      <AnimatePresence>
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <HeroSection />
      <TrendingSection />
      <MoodFilterSection />
      <AIShowcaseSection />
      <SeasonalSection />
      <StatsSection />
      <QuizCTASection />
    </PageWrapper>
  );
}
