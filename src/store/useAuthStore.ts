import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  setAuth: (user: { name: string; email: string }) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      setAuth: (user) => set({ isAuthenticated: true, user }),
      setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
