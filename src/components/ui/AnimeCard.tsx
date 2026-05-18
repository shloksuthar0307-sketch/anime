import { motion } from 'framer-motion';
import { Star, Plus, Check } from 'lucide-react';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useNavigate } from 'react-router-dom';
import { truncateText } from '../../utils/formatters';

interface AnimeCardProps {
  anime: {
    mal_id: number;
    title: string;
    images?: { jpg?: { large_image_url?: string; image_url?: string } };
    score?: number;
    genres?: { name: string; mal_id: number }[];
    episodes?: number;
    type?: string;
  };
  index?: number;
}

export default function AnimeCard({ anime, index = 0 }: AnimeCardProps) {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeItem } = useWatchlist();
  const inList = isInWatchlist(anime.mal_id);
  const imageUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group relative flex flex-col rounded-card overflow-hidden glass-card cursor-pointer"
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={anime.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-void-surface flex items-center justify-center">
            <span className="text-text-muted font-display text-4xl">?</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {anime.score && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-void/80 backdrop-blur-sm rounded-card px-2 py-1">
            <Star className="w-3 h-3 text-neon-gold fill-neon-gold" />
            <span className="text-xs font-mono font-bold text-neon-gold">{anime.score.toFixed(1)}</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (inList) {
              removeItem(anime.mal_id);
            } else {
              addToWatchlist({
                mal_id: anime.mal_id,
                title: anime.title,
                image: imageUrl || '',
                score: anime.score ?? null,
                episodes: anime.episodes ?? null,
              });
            }
          }}
          className={`absolute top-2 left-2 p-1.5 rounded-card backdrop-blur-sm transition-all duration-200
            ${inList ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-void/60 text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/10'}`}
        >
          {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      <div className="p-3 flex flex-col gap-1.5">
        <h3 className="font-display font-semibold text-sm text-text-primary leading-tight line-clamp-2">
          {truncateText(anime.title, 50)}
        </h3>
        <div className="flex flex-wrap gap-1">
          {anime.genres?.slice(0, 2).map((g) => (
            <span key={g.mal_id} className="text-[10px] px-1.5 py-0.5 rounded-cyber bg-neon-cyan/10 text-neon-cyan font-mono">
              {g.name}
            </span>
          ))}
        </div>
        {anime.episodes && (
          <span className="text-[10px] text-text-muted font-mono">{anime.episodes} eps</span>
        )}
      </div>
    </motion.div>
  );
}
