/**
 * Composant de tableau de bord principal
 * Affiche les statistiques, graphiques et aperçu des livraisons selon le rôle de l'utilisateur
 */

import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { 
  Truck, 
  Package, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/authStore';
import { DeliveryStats, DriverStats, Delivery, DeliveryStatus } from '../../types';
import apiService from '../../services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

// Composant de carte statistique
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, change, changeType }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${color}`}>
            {icon}
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              {change && (
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                }`}>
                  {changeType === 'positive' ? '↗' : '↘'} {change}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

// Composant de liste des livraisons récentes
interface RecentDeliveriesProps {
  deliveries: Delivery[];
  onViewDelivery: (trackingNumber: string) => void;
}

const RecentDeliveries: React.FC<RecentDeliveriesProps> = ({ deliveries, onViewDelivery }) => {
  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case DeliveryStatus.PENDING:
        return 'bg-warning-100 text-warning-800';
      case DeliveryStatus.IN_TRANSIT:
        return 'bg-primary-100 text-primary-800';
      case DeliveryStatus.DELIVERED:
        return 'bg-success-100 text-success-800';
      case DeliveryStatus.FAILED:
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case DeliveryStatus.PENDING:
        return <Clock className="h-4 w-4" />;
      case DeliveryStatus.IN_TRANSIT:
        return <Truck className="h-4 w-4" />;
      case DeliveryStatus.DELIVERED:
        return <CheckCircle className="h-4 w-4" />;
      case DeliveryStatus.FAILED:
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Livraisons récentes
        </h3>
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {deliveries.map((delivery) => (
              <li key={delivery.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <Package className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {delivery.customerName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {delivery.pickupCity} → {delivery.deliveryCity}
                    </p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(delivery.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                      {getStatusIcon(delivery.status)}
                      <span className="ml-1">{delivery.status}</span>
                    </span>
                    <button
                      onClick={() => onViewDelivery(delivery.trackingNumber)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {deliveries.length === 0 && (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune livraison</h3>
            <p className="mt-1 text-sm text-gray-500">
              Commencez par créer une nouvelle livraison.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant principal du tableau de bord
const Dashboard: React.FC = () => {
  const { user, isClient, isDriver, isAdmin, isManager } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Requêtes pour les données
  const { data: deliveryStats, isLoading: statsLoading } = useQuery<DeliveryStats>(
    'deliveryStats',
    () => apiService.getDeliveryStats(),
    {
      refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
    }
  );

  const { data: driverStats, isLoading: driverStatsLoading } = useQuery<DriverStats>(
    'driverStats',
    () => apiService.getDriverStats(),
    {
      refetchInterval: 30000,
    }
  );

  const { data: recentDeliveries, isLoading: deliveriesLoading } = useQuery<Delivery[]>(
    'recentDeliveries',
    () => apiService.getDeliveries({ dateFrom: new Date().toISOString().split('T')[0] }),
    {
      refetchInterval: 15000, // Rafraîchir toutes les 15 secondes
    }
  );

  const handleViewDelivery = (trackingNumber: string) => {
    // Navigation vers la page de détail de la livraison
    window.location.href = `/deliveries/${trackingNumber}`;
  };

  const handleCreateDelivery = () => {
    window.location.href = '/deliveries/new';
  };

  if (statsLoading || driverStatsLoading || deliveriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tableau de bord
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Bienvenue, {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
              </select>
              {!isClient && (
                <button
                  onClick={handleCreateDelivery}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle livraison
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Livraisons totales"
            value={deliveryStats?.total || 0}
            icon={<Package className="h-5 w-5 text-white" />}
            color="bg-primary-500"
            change="+12%"
            changeType="positive"
          />
          <StatCard
            title="En cours"
            value={deliveryStats?.inTransit || 0}
            icon={<Truck className="h-5 w-5 text-white" />}
            color="bg-warning-500"
          />
          <StatCard
            title="Livrées"
            value={deliveryStats?.delivered || 0}
            icon={<CheckCircle className="h-5 w-5 text-white" />}
            color="bg-success-500"
            change="+8%"
            changeType="positive"
          />
          <StatCard
            title="Chauffeurs actifs"
            value={driverStats?.availableDrivers || 0}
            icon={<Users className="h-5 w-5 text-white" />}
            color="bg-secondary-500"
          />
        </div>

        {/* Graphiques et détails */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique des livraisons */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Évolution des livraisons
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Graphique en cours de développement
              </div>
            </div>
          </div>

          {/* Livraisons récentes */}
          <RecentDeliveries
            deliveries={recentDeliveries || []}
            onViewDelivery={handleViewDelivery}
          />
        </div>

        {/* Actions rapides pour les administrateurs */}
        {(isAdmin || isManager) && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-md bg-primary-500 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Gestion des chauffeurs
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {driverStats?.totalDrivers || 0} chauffeurs
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Voir tous les chauffeurs →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-md bg-success-500 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Gestion des véhicules
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          Véhicules disponibles
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-sm font-medium text-success-600 hover:text-success-500">
                    Voir tous les véhicules →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-md bg-warning-500 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Rapports et analyses
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          Statistiques détaillées
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-sm font-medium text-warning-600 hover:text-warning-500">
                    Voir les rapports →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 