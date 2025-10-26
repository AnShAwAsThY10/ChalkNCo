import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAdmin: false,
      username: null,

      login: (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {
          set({
            isAuthenticated: true,
            isAdmin: true,
            username: 'admin'
          });
          return true;
        } else if (username && password) {
          set({
            isAuthenticated: true,
            isAdmin: false,
            username: username
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          isAdmin: false,
          username: null
        });
      }
    }),
    {
      name: 'chalk-canva-auth',
    }
  )
);