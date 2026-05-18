import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistItem {
  mal_id: number;
  title: string;
  image: string;
  score: number | null;
  status: 'watching' | 'completed' | 'plan_to_watch' | 'dropped';
  progress: number;
  episodes: number | null;
  isFavorite: boolean;
  addedAt: string;
}

interface WatchlistStore {
  items: WatchlistItem[];
  addItem: (item: Omit<WatchlistItem, 'addedAt'>) => void;
  removeItem: (malId: number) => void;
  updateStatus: (malId: number, status: WatchlistItem['status']) => void;
  updateProgress: (malId: number, progress: number) => void;
  toggleFavorite: (malId: number) => void;
  isInWatchlist: (malId: number) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((s) => ({
          items: s.items.some((i) => i.mal_id === item.mal_id)
            ? s.items
            : [...s.items, { ...item, addedAt: new Date().toISOString() }],
        })),
      removeItem: (malId) =>
        set((s) => ({ items: s.items.filter((i) => i.mal_id !== malId) })),
      updateStatus: (malId, status) =>
        set((s) => ({
          items: s.items.map((i) => (i.mal_id === malId ? { ...i, status } : i)),
        })),
      updateProgress: (malId, progress) =>
        set((s) => ({
          items: s.items.map((i) => (i.mal_id === malId ? { ...i, progress } : i)),
        })),
      toggleFavorite: (malId) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.mal_id === malId ? { ...i, isFavorite: !i.isFavorite } : i
          ),
        })),
      isInWatchlist: (malId) => get().items.some((i) => i.mal_id === malId),
    }),
    { name: 'aru-watchlist' }
  )
);
