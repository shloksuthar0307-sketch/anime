import { create } from 'zustand';

interface User {
  id: string;
  email?: string;
  [key: string]: unknown;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user, isLoading: false }),
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
}));
