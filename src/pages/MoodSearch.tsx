import { motion, AnimatePresence } from 'framer-motion';
import { useMoodStore } from '../store/useMoodStore';
import { useMoodAnime } from '../hooks/useAnime';
import { MOODS, MOOD_GENRES } from '../utils/constants';
import MoodCard from '../components/ui/MoodCard';
import AnimeCard from '../components/ui/AnimeCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import PageWrapper from '../components/layout/PageWrapper';

export default function MoodSearch() {
  const { selectedMood, setMood } = useMoodStore();
  const { data: moodAnime, isLoading } = useMoodAnime(
    selectedMood ? MOOD_GENRES[selectedMood]?.jikanIds || null : null
  );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-void pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-3xl sm:text-4xl gradient-text mb-2">Mood Search</h1>
            <p className="text-text-secondary text-sm">Find anime that matches how you feel right now</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 mb-10">
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

          <AnimatePresence mode="wait">
            {selectedMood ? (
              <motion.div
                key={selectedMood}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{MOODS.find((m) => m.id === selectedMood)?.emoji}</span>
                  <div>
                    <h2 className="font-display font-bold text-xl text-text-primary">
                      {MOODS.find((m) => m.id === selectedMood)?.label} Anime
                    </h2>
                    <p className="text-text-muted text-xs font-mono">{MOOD_GENRES[selectedMood]?.label}</p>
                  </div>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : moodAnime && moodAnime.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {moodAnime.map((anime: any, i: number) => (
                      <AnimeCard key={anime.mal_id} anime={anime} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-text-muted text-lg font-display">No anime found for this mood</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className="text-text-muted text-lg font-display">Select a mood to discover anime</p>
                <p className="text-text-muted text-sm mt-2">Each mood maps to specific genres and themes</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
