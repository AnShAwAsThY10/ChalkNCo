import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isAdmin: false,
      username: null,
      users: [
        { username: 'admin', password: 'admin', isAdmin: true }
      ],

      login: (username: string, password: string) => {
        const { users } = get();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          set({
            isAuthenticated: true,
            isAdmin: user.isAdmin,
            username: user.username
          });
          return true;
        }
        return false;
      },

      register: (username: string, password: string) => {
        const { users } = get();
        
        // Check if username already exists
        if (users.find(u => u.username === username)) {
          return false; // Username already exists
        }
        
        // Add new user
        const newUser: User = { username, password, isAdmin: false };
        set({
          users: [...users, newUser],
          isAuthenticated: true,
          isAdmin: false,
          username: username
        });
        return true;
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