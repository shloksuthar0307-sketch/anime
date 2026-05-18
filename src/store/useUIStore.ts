import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  modalContent: string | null;
  openModal: (content: string) => void;
  closeModal: () => void;
  showPreloader: boolean;
  setPreloader: (show: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  modalContent: null,
  openModal: (content) => set({ modalContent: content }),
  closeModal: () => set({ modalContent: null }),
  showPreloader: true,
  setPreloader: (show) => set({ showPreloader: show }),
  soundEnabled: false,
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
}));
