import { create } from 'zustand';

interface AnimeData {
  mal_id: number;
  title: string;
  images?: { jpg?: { large_image_url?: string } };
  score?: number;
  genres?: { name: string }[];
  episodes?: number;
  status?: string;
  synopsis?: string;
  [key: string]: unknown;
}

interface AnimeStore {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
  clearGenres: () => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  cachedAnime: Record<number, AnimeData>;
  cacheAnime: (anime: AnimeData) => void;
}

export const useAnimeStore = create<AnimeStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedGenres: [],
  toggleGenre: (genre) =>
    set((state) => ({
      selectedGenres: state.selectedGenres.includes(genre)
        ? state.selectedGenres.filter((g) => g !== genre)
        : [...state.selectedGenres, genre],
    })),
  clearGenres: () => set({ selectedGenres: [] }),
  sortBy: 'score',
  setSortBy: (sort) => set({ sortBy: sort }),
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
  cachedAnime: {},
  cacheAnime: (anime) =>
    set((state) => ({
      cachedAnime: { ...state.cachedAnime, [anime.mal_id]: anime },
    })),
}));
