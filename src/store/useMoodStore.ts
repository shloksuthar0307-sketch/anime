import { create } from 'zustand';

interface MoodStore {
  selectedMood: string | null;
  setMood: (mood: string | null) => void;
  favorites: string[];
  addFavorite: (anime: string) => void;
  removeFavorite: (anime: string) => void;
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  aiStep: number;
  setAIStep: (step: number) => void;
  resetFlow: () => void;
}

export const useMoodStore = create<MoodStore>((set) => ({
  selectedMood: null,
  setMood: (mood) => set({ selectedMood: mood }),
  favorites: [],
  addFavorite: (anime) =>
    set((s) => ({ favorites: s.favorites.includes(anime) ? s.favorites : [...s.favorites, anime] })),
  removeFavorite: (anime) =>
    set((s) => ({ favorites: s.favorites.filter((f) => f !== anime) })),
  selectedGenres: [],
  toggleGenre: (genre) =>
    set((s) => ({
      selectedGenres: s.selectedGenres.includes(genre)
        ? s.selectedGenres.filter((g) => g !== genre)
        : [...s.selectedGenres, genre],
    })),
  description: '',
  setDescription: (desc) => set({ description: desc }),
  aiStep: 0,
  setAIStep: (step) => set({ aiStep: step }),
  resetFlow: () =>
    set({ selectedMood: null, favorites: [], selectedGenres: [], description: '', aiStep: 0 }),
}));
