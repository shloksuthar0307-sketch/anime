import { useWatchlistStore } from '../store/useWatchlistStore';

export const useWatchlist = () => {
  const { items, addItem, removeItem, updateStatus, updateProgress, toggleFavorite, isInWatchlist } = useWatchlistStore();

  const addToWatchlist = (anime: {
    mal_id: number;
    title: string;
    image: string;
    score: number | null;
    episodes: number | null;
  }) => {
    addItem({
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.image,
      score: anime.score,
      status: 'plan_to_watch',
      progress: 0,
      episodes: anime.episodes,
      isFavorite: false,
    });
  };

  return { items, addToWatchlist, removeItem, updateStatus, updateProgress, toggleFavorite, isInWatchlist };
};
