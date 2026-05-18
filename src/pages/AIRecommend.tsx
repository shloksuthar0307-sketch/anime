import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw, Gem, Zap } from 'lucide-react';
import { useMoodStore } from '../store/useMoodStore';
import { getAIRecommendations } from '../services/openai.service';
import { MOODS, GENRE_LIST } from '../utils/constants';
import { useWatchlist } from '../hooks/useWatchlist';
import MoodCard from '../components/ui/MoodCard';
import GenreBadge from '../components/ui/GenreBadge';
import NeonButton from '../components/ui/NeonButton';
import GlassCard from '../components/ui/GlassCard';
import PageWrapper from '../components/layout/PageWrapper';

const AIOrb = lazy(() => import('../three/scenes/AIOrb'));

const steps = ['Mood', 'Favorites', 'Genres', 'Analyzing', 'Results'];

export default function AIRecommend() {
  const {
    selectedMood, setMood,
    favorites, addFavorite, removeFavorite,
    selectedGenres, toggleGenre,
    description, setDescription,
    aiStep, setAIStep, resetFlow,
  } = useMoodStore();

  const [results, setResults] = useState<any[]>([]);
  const [_isProcessing, setIsProcessing] = useState(false);
  const [favoriteInput, setFavoriteInput] = useState('');
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  const canProceed = () => {
    if (aiStep === 0) return !!selectedMood;
    if (aiStep === 1) return favorites.length >= 1;
    if (aiStep === 2) return selectedGenres.length >= 1;
    return true;
  };

  const handleNext = async () => {
    if (aiStep === 3) return;
    if (aiStep === 2) {
      setAIStep(3);
      setIsProcessing(true);
      try {
        const recs = await getAIRecommendations({
          mood: selectedMood || 'happy',
          favorites,
          genres: selectedGenres,
          description,
        });
        setResults(recs);
      } catch {
        setResults([]);
      }
      setIsProcessing(false);
      setAIStep(4);
      return;
    }
    setAIStep(aiStep + 1);
  };

  const handleReset = () => {
    resetFlow();
    setResults([]);
  };

  const addFavoriteHandler = () => {
    if (favoriteInput.trim() && !favorites.includes(favoriteInput.trim())) {
      addFavorite(favoriteInput.trim());
      setFavoriteInput('');
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-void pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl sm:text-4xl gradient-text mb-2">AI Recommendations</h1>
            <p className="text-text-secondary text-sm">Let ARU find your perfect anime match</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300
                  ${i <= aiStep ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50' : 'bg-void-surface text-text-muted border border-glass-border'}`}
                >
                  {i < aiStep ? '✓' : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 transition-colors duration-300 ${i < aiStep ? 'bg-neon-cyan/50' : 'bg-glass-border'}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {aiStep === 0 && (
              <motion.div key="mood" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <h2 className="font-display font-bold text-xl text-text-primary mb-4 text-center">How are you feeling right now?</h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-6">
                  {MOODS.map((mood) => (
                    <MoodCard
                      key={mood.id}
                      id={mood.id}
                      emoji={mood.emoji}
                      label={mood.label}
                      color={mood.color}
                      selected={selectedMood === mood.id}
                      onClick={() => setMood(mood.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {aiStep === 1 && (
              <motion.div key="favorites" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <h2 className="font-display font-bold text-xl text-text-primary mb-4 text-center">What are your favorite anime?</h2>
                <p className="text-text-secondary text-sm text-center mb-6">Add at least 1 anime you love</p>
                <div className="flex gap-2 mb-4">
                  <input
                    value={favoriteInput}
                    onChange={(e) => setFavoriteInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addFavoriteHandler()}
                    placeholder="Type an anime title..."
                    className="flex-1 bg-void-surface/50 border border-glass-border rounded-card px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all"
                  />
                  <NeonButton onClick={addFavoriteHandler} size="md">Add</NeonButton>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {favorites.map((fav) => (
                    <span key={fav} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-sm border border-neon-cyan/30">
                      {fav}
                      <button onClick={() => removeFavorite(fav)} className="hover:text-neon-pink transition-colors">&times;</button>
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-sm text-text-secondary mb-1 block">Anything else ARU should know?</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., I want something short and emotional, or I love plot twists..."
                    className="w-full bg-void-surface/50 border border-glass-border rounded-card px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all h-20 resize-none"
                  />
                </div>
              </motion.div>
            )}

            {aiStep === 2 && (
              <motion.div key="genres" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <h2 className="font-display font-bold text-xl text-text-primary mb-4 text-center">Pick your preferred genres</h2>
                <p className="text-text-secondary text-sm text-center mb-6">Select at least 1 genre</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {GENRE_LIST.map((genre) => (
                    <GenreBadge
                      key={genre}
                      genre={genre}
                      active={selectedGenres.includes(genre)}
                      onClick={() => toggleGenre(genre)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {aiStep === 3 && (
              <motion.div key="processing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-[200px] h-[200px] mb-6">
                    <Suspense fallback={<Sparkles className="w-16 h-16 text-neon-cyan animate-pulse" />}>
                      <AIOrb />
                    </Suspense>
                  </div>
                  <h2 className="font-display font-bold text-xl gradient-text mb-2">ARU is thinking...</h2>
                  <p className="text-text-muted text-sm font-mono">Analyzing your preferences</p>
                  <div className="flex gap-1 mt-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-neon-cyan"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {aiStep === 4 && (
              <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <h2 className="font-display font-bold text-xl text-text-primary mb-6 text-center">Your Perfect Matches</h2>
                {results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((rec: any, i: number) => (
                      <motion.div
                        key={rec.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                      >
                        <GlassCard className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-display font-bold text-lg text-text-primary">{rec.title}</h3>
                              {rec.hidden_gem && (
                                <span className="flex items-center gap-1 text-[10px] font-mono text-neon-gold bg-neon-gold/10 px-1.5 py-0.5 rounded-card">
                                  <Gem className="w-3 h-3" /> Hidden Gem
                                </span>
                              )}
                            </div>
                            <p className="text-text-secondary text-sm mb-2">{rec.reason}</p>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-neon-cyan font-mono">{rec.emotional_tag}</span>
                              <span className="text-text-muted">|</span>
                              <span className="font-mono text-neon-gold">{rec.match_score}% match</span>
                            </div>
                            <div className="mt-2 w-full bg-void-surface rounded-full h-1.5 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${rec.match_score}%` }}
                                transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                              />
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <NeonButton
                              variant={isInWatchlist(rec.mal_id) ? 'purple' : 'cyan'}
                              size="sm"
                              onClick={() => {
                                if (!isInWatchlist(rec.mal_id)) {
                                  addToWatchlist({
                                    mal_id: rec.mal_id,
                                    title: rec.title,
                                    image: '',
                                    score: null,
                                    episodes: null,
                                  });
                                }
                              }}
                            >
                              {isInWatchlist(rec.mal_id) ? 'Added' : '+ Watchlist'}
                            </NeonButton>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-text-muted">No results. Try adjusting your preferences.</p>
                  </div>
                )}
                <div className="flex items-center justify-center gap-4 mt-8">
                  <NeonButton variant="purple" onClick={handleReset}>
                    <span className="flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Start Over</span>
                  </NeonButton>
                  <NeonButton variant="cyan" onClick={() => { setAIStep(2); setResults([]); }}>
                    <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Refine</span>
                  </NeonButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {aiStep < 3 && (
            <div className="flex items-center justify-between mt-8">
              <NeonButton
                variant="purple"
                onClick={() => setAIStep(Math.max(0, aiStep - 1))}
                disabled={aiStep === 0}
              >
                <span className="flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back</span>
              </NeonButton>
              <NeonButton
                variant="cyan"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                <span className="flex items-center gap-2">
                  {aiStep === 2 ? 'Get Recommendations' : 'Next'} <ArrowRight className="w-4 h-4" />
                </span>
              </NeonButton>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
