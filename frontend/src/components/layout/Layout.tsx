/**
 * Composant Layout principal
 * Gère la structure générale de l'application avec navigation et sidebar
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  Truck, 
  Users, 
  Settings, 
  LogOut, 
  User,
  Bell,
  Search
} from 'lucide-react';
import { useAuth, useAuthActions } from '../../contexts/authStore';
import { NavItem } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation selon le rôle de l'utilisateur
  const getNavigationItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      {
        name: 'Tableau de bord',
        href: '/dashboard',
        icon: Home,
        current: location.pathname === '/dashboard',
      },
    ];

    if (user?.role === 'CLIENT') {
      return [
        ...baseItems,
        {
          name: 'Mes livraisons',
          href: '/client/deliveries',
          icon: Package,
          current: location.pathname.startsWith('/client/deliveries'),
        },
        {
          name: 'Suivi en temps réel',
          href: '/client/tracking',
          icon: Truck,
          current: location.pathname.startsWith('/client/tracking'),
        },
      ];
    }

    if (user?.role === 'DRIVER') {
      return [
        ...baseItems,
        {
          name: 'Mes livraisons',
          href: '/driver/deliveries',
          icon: Package,
          current: location.pathname.startsWith('/driver/deliveries'),
        },
        {
          name: 'Statut',
          href: '/driver/status',
          icon: Truck,
          current: location.pathname.startsWith('/driver/status'),
        },
      ];
    }

    if (user?.role === 'ADMIN' || user?.role === 'MANAGER') {
      return [
        ...baseItems,
        {
          name: 'Livraisons',
          href: '/admin/deliveries',
          icon: Package,
          current: location.pathname.startsWith('/admin/deliveries'),
        },
        {
          name: 'Chauffeurs',
          href: '/admin/drivers',
          icon: Users,
          current: location.pathname.startsWith('/admin/drivers'),
        },
        {
          name: 'Véhicules',
          href: '/admin/vehicles',
          icon: Truck,
          current: location.pathname.startsWith('/admin/vehicles'),
        },
        {
          name: 'Statistiques',
          href: '/admin/stats',
          icon: Settings,
          current: location.pathname.startsWith('/admin/stats'),
        },
      ];
    }

    return baseItems;
  };

  const navigation = getNavigationItems();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar mobile */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-semibold text-gray-900">Mobility</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    item.current
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-4 flex-shrink-0 h-6 w-6 ${
                      item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-semibold text-gray-900">Mobility</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Barre de navigation supérieure */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Rechercher..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notifications */}
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Bell className="h-6 w-6" />
              </button>

              {/* Menu utilisateur */}
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{user?.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 