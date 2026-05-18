import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Play, CheckCircle, Heart, Trash2, Star } from 'lucide-react';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import NeonButton from '../components/ui/NeonButton';
import PageWrapper from '../components/layout/PageWrapper';

const tabs = [
  { id: 'all', label: 'All', icon: Bookmark },
  { id: 'watching', label: 'Watching', icon: Play },
  { id: 'completed', label: 'Completed', icon: CheckCircle },
  { id: 'plan_to_watch', label: 'Plan to Watch', icon: Bookmark },
  { id: 'favorites', label: 'Favorites', icon: Heart },
] as const;

export default function Watchlist() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { items, removeItem, updateStatus, toggleFavorite } = useWatchlistStore();
  const navigate = useNavigate();

  const filtered = activeTab === 'all'
    ? items
    : activeTab === 'favorites'
    ? items.filter((i) => i.isFavorite)
    : items.filter((i) => i.status === activeTab);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-void pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-3xl gradient-text mb-6">My Watchlist</h1>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30'
                    : 'bg-glass-bg text-text-muted border-glass-border hover:text-text-secondary'
                  }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
                <span className="ml-1 opacity-60">
                  {tab.id === 'all' ? items.length : tab.id === 'favorites' ? items.filter((i) => i.isFavorite).length : items.filter((i) => i.status === tab.id).length}
                </span>
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((item) => (
                  <motion.div
                    key={item.mal_id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <GlassCard className="flex gap-3 cursor-pointer" onClick={() => navigate(`/anime/${item.mal_id}`)}>
                      <div className="w-16 h-20 flex-shrink-0 rounded-card overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-void-surface flex items-center justify-center">
                            <Bookmark className="w-4 h-4 text-text-muted" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-sm text-text-primary truncate">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-card capitalize
                            ${item.status === 'watching' ? 'bg-green-500/10 text-green-400' :
                              item.status === 'completed' ? 'bg-blue-500/10 text-blue-400' :
                              item.status === 'dropped' ? 'bg-red-500/10 text-red-400' :
                              'bg-neon-cyan/10 text-neon-cyan'}`}
                          >
                            {item.status.replace('_', ' ')}
                          </span>
                          {item.score && (
                            <span className="flex items-center gap-0.5 text-[10px] text-neon-gold font-mono">
                              <Star className="w-2.5 h-2.5 fill-current" /> {item.score}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavorite(item.mal_id); }}
                            className={`p-1 rounded transition-colors ${item.isFavorite ? 'text-neon-pink' : 'text-text-muted hover:text-neon-pink'}`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-current' : ''}`} />
                          </button>
                          <select
                            value={item.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateStatus(item.mal_id, e.target.value as any)}
                            className="text-[10px] bg-void-surface border border-glass-border rounded px-1 py-0.5 text-text-secondary focus:outline-none"
                          >
                            <option value="watching">Watching</option>
                            <option value="completed">Completed</option>
                            <option value="plan_to_watch">Plan to Watch</option>
                            <option value="dropped">Dropped</option>
                          </select>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeItem(item.mal_id); }}
                            className="p-1 rounded text-text-muted hover:text-red-400 transition-colors ml-auto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16">
              <Bookmark className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted text-lg font-display">Your watchlist is empty</p>
              <p className="text-text-muted text-sm mt-2">Start exploring and add anime you want to watch</p>
              <NeonButton className="mt-4" onClick={() => navigate('/explore')}>Explore Anime</NeonButton>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
