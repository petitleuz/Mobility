/**
 * Store d'authentification avec Zustand
 * Gère l'état de l'utilisateur connecté et les tokens d'authentification
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState, LoginRequest, LoginResponse } from '../types';
import apiService from '../services/api';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // État initial
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true });
          
          const response: LoginResponse = await apiService.login(credentials);
          
          // Sauvegarder les tokens
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          
          set({
            user: response.user,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          // Appeler l'API de déconnexion
          await apiService.logout();
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error);
        } finally {
          // Nettoyer le stockage local
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      refreshToken: async () => {
        try {
          set({ isLoading: true });
          
          const response: LoginResponse = await apiService.refreshToken();
          
          // Mettre à jour les tokens
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          
          set({
            user: response.user,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // En cas d'échec, déconnecter l'utilisateur
          get().clearAuth();
          throw error;
        }
      },

      setUser: (user: User) => {
        set({ user });
      },

      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
      },

      clearAuth: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      checkAuth: async () => {
        const token = localStorage.getItem('accessToken');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return false;
        }

        try {
          set({ isLoading: true });
          
          // Vérifier le token en appelant l'API
          const currentUser = await apiService.getProfile();
          
          set({
            user: currentUser,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return true;
        } catch (error) {
          // Token invalide, nettoyer l'état
          get().clearAuth();
          return false;
        }
      },
    }),
    {
      name: 'auth-storage', // Nom de la clé dans localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Hooks utilitaires
export const useAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    isClient: user?.role === 'CLIENT',
    isDriver: user?.role === 'DRIVER',
    isAdmin: user?.role === 'ADMIN',
    isManager: user?.role === 'MANAGER',
  };
};

export const useAuthActions = () => {
  const { login, logout, refreshToken, checkAuth } = useAuthStore();
  
  return {
    login,
    logout,
    refreshToken,
    checkAuth,
  };
}; 