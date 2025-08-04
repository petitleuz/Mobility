/**
 * Application principale React
 * Gère le routage, l'authentification et la structure générale de l'application
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { useAuth, useAuthActions } from './contexts/authStore';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import './index.css';

// Configuration du client React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Composant de protection des routes
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Composant de page d'accueil
const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

// Composant de page non autorisée
const UnauthorizedPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Accès refusé</h1>
        <p className="mt-2 text-sm text-gray-600">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Composant de suivi de livraison public
const PublicTrackingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Suivi de livraison
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Entrez votre numéro de suivi pour suivre votre livraison
          </p>
          
          {/* Formulaire de suivi */}
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Numéro de suivi (ex: DEL123456789)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                Suivre
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal de l'application
const App: React.FC = () => {
  const { checkAuth } = useAuthActions();

  useEffect(() => {
    // Vérifier l'authentification au démarrage
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/tracking" element={<PublicTrackingPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Routes protégées */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Routes pour les clients */}
            <Route
              path="/client/*"
              element={
                <ProtectedRoute requiredRole="CLIENT">
                  <Layout>
                    <div>Espace Client</div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Routes pour les chauffeurs */}
            <Route
              path="/driver/*"
              element={
                <ProtectedRoute requiredRole="DRIVER">
                  <Layout>
                    <div>Espace Chauffeur</div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Routes pour les administrateurs */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <Layout>
                    <div>Espace Administrateur</div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Routes pour les managers */}
            <Route
              path="/manager/*"
              element={
                <ProtectedRoute requiredRole="MANAGER">
                  <Layout>
                    <div>Espace Manager</div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Route par défaut */}
            <Route path="/" element={<HomePage />} />
            
            {/* Route 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Page non trouvée</h1>
                    <p className="mt-2 text-sm text-gray-600">
                      La page que vous recherchez n'existe pas.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
          
          {/* Notifications toast */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App; 