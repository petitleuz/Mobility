/**
 * Composant de formulaire de connexion
 * Gère l'authentification des utilisateurs avec validation et gestion d'erreurs
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Truck, User, Building } from 'lucide-react';
import { useAuthActions } from '../../contexts/authStore';
import { LoginRequest } from '../../types';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      await login(data);
      toast.success('Connexion réussie !');
      onSuccess?.();
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      
      // Gérer les erreurs spécifiques
      if (error.response?.status === 401) {
        setError('email', { message: 'Email ou mot de passe incorrect' });
        setError('password', { message: 'Email ou mot de passe incorrect' });
        toast.error('Email ou mot de passe incorrect');
      } else if (error.response?.status === 403) {
        toast.error('Compte suspendu ou inactif');
      } else {
        toast.error('Erreur de connexion. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary-100">
            <Truck className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre espace de gestion de livraison
          </p>
        </div>

        {/* Formulaire */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide',
                    },
                  })}
                  className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${
                    errors.email ? 'border-error-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Le mot de passe est requis',
                    minLength: {
                      value: 6,
                      message: 'Le mot de passe doit contenir au moins 6 caractères',
                    },
                  })}
                  className={`appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border ${
                    errors.password ? 'border-error-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Bouton de connexion */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connexion en cours...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </div>

          {/* Liens utiles */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Mot de passe oublié ?
              </a>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Besoin d'aide ?
              </a>
            </div>
          </div>
        </form>

        {/* Informations sur les rôles */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Accès par rôle :</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>Client : Suivi de vos livraisons</span>
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              <span>Chauffeur : Gestion des livraisons</span>
            </div>
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2" />
              <span>Admin/Manager : Tableau de bord complet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 