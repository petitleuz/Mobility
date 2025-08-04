/**
 * Service API principal pour l'application de gestion de livraison
 * Gère toutes les requêtes HTTP vers le backend Spring Boot
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  Delivery, 
  CreateDeliveryRequest, 
  UpdateDeliveryStatusRequest,
  Driver,
  Vehicle,
  User,
  LoginRequest,
  LoginResponse,
  DeliveryStats,
  DriverStats,
  DeliveryFilters,
  DriverFilters,
  PaginatedResponse
} from '../types';

// Configuration de l'instance axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token d'authentification
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur pour gérer les erreurs de réponse
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expiré, rediriger vers la page de connexion
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Méthode générique pour les requêtes GET
   */
  private async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  /**
   * Méthode générique pour les requêtes POST
   */
  private async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  /**
   * Méthode générique pour les requêtes PUT
   */
  private async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data;
  }

  /**
   * Méthode générique pour les requêtes DELETE
   */
  private async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }

  // ===== AUTHENTIFICATION =====

  /**
   * Authentifier un utilisateur
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', credentials);
  }

  /**
   * Déconnecter un utilisateur
   */
  async logout(): Promise<void> {
    return this.post<void>('/auth/logout');
  }

  /**
   * Rafraîchir le token d'accès
   */
  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.post<LoginResponse>('/auth/refresh', { refreshToken });
  }

  /**
   * Obtenir le profil de l'utilisateur connecté
   */
  async getProfile(): Promise<User> {
    return this.get<User>('/auth/profile');
  }

  // ===== LIVRAISONS =====

  /**
   * Créer une nouvelle livraison
   */
  async createDelivery(delivery: CreateDeliveryRequest): Promise<Delivery> {
    return this.post<Delivery>('/deliveries', delivery);
  }

  /**
   * Obtenir toutes les livraisons
   */
  async getDeliveries(filters?: DeliveryFilters): Promise<Delivery[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.driverId) params.append('driverId', filters.driverId);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    if (filters?.city) params.append('city', filters.city);

    return this.get<Delivery[]>(`/deliveries?${params.toString()}`);
  }

  /**
   * Obtenir une livraison par numéro de suivi
   */
  async getDeliveryByTrackingNumber(trackingNumber: string): Promise<Delivery> {
    return this.get<Delivery>(`/deliveries/${trackingNumber}`);
  }

  /**
   * Obtenir les livraisons par statut
   */
  async getDeliveriesByStatus(status: string): Promise<Delivery[]> {
    return this.get<Delivery[]>(`/deliveries/status/${status}`);
  }

  /**
   * Obtenir les livraisons d'un chauffeur
   */
  async getDeliveriesByDriver(driverId: string): Promise<Delivery[]> {
    return this.get<Delivery[]>(`/deliveries/driver/${driverId}`);
  }

  /**
   * Mettre à jour le statut d'une livraison
   */
  async updateDeliveryStatus(
    trackingNumber: string, 
    updateRequest: UpdateDeliveryStatusRequest
  ): Promise<Delivery> {
    return this.put<Delivery>(`/deliveries/${trackingNumber}/status`, updateRequest);
  }

  /**
   * Assigner une livraison à un chauffeur
   */
  async assignDeliveryToDriver(
    trackingNumber: string, 
    driverId: string, 
    vehicleId: string
  ): Promise<Delivery> {
    return this.put<Delivery>(
      `/deliveries/${trackingNumber}/assign?driverId=${driverId}&vehicleId=${vehicleId}`
    );
  }

  /**
   * Suivre une livraison (endpoint public)
   */
  async trackDelivery(trackingNumber: string): Promise<Delivery> {
    return this.get<Delivery>(`/deliveries/tracking/${trackingNumber}`);
  }

  // ===== CHAUFFEURS =====

  /**
   * Obtenir tous les chauffeurs
   */
  async getDrivers(filters?: DriverFilters): Promise<Driver[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.city) params.append('city', filters.city);
    if (filters?.available !== undefined) params.append('available', filters.available.toString());

    return this.get<Driver[]>(`/drivers?${params.toString()}`);
  }

  /**
   * Obtenir un chauffeur par ID
   */
  async getDriver(driverId: string): Promise<Driver> {
    return this.get<Driver>(`/drivers/${driverId}`);
  }

  /**
   * Obtenir les chauffeurs disponibles
   */
  async getAvailableDrivers(): Promise<Driver[]> {
    return this.get<Driver[]>('/drivers/available');
  }

  /**
   * Mettre à jour le statut d'un chauffeur
   */
  async updateDriverStatus(driverId: string, status: string): Promise<Driver> {
    return this.put<Driver>(`/drivers/${driverId}/status`, { status });
  }

  /**
   * Mettre à jour la localisation d'un chauffeur
   */
  async updateDriverLocation(driverId: string, location: { latitude: number; longitude: number }): Promise<Driver> {
    return this.put<Driver>(`/drivers/${driverId}/location`, location);
  }

  // ===== VÉHICULES =====

  /**
   * Obtenir tous les véhicules
   */
  async getVehicles(): Promise<Vehicle[]> {
    return this.get<Vehicle[]>('/vehicles');
  }

  /**
   * Obtenir un véhicule par ID
   */
  async getVehicle(vehicleId: string): Promise<Vehicle> {
    return this.get<Vehicle>(`/vehicles/${vehicleId}`);
  }

  /**
   * Obtenir les véhicules disponibles
   */
  async getAvailableVehicles(): Promise<Vehicle[]> {
    return this.get<Vehicle[]>('/vehicles/available');
  }

  /**
   * Mettre à jour le statut d'un véhicule
   */
  async updateVehicleStatus(vehicleId: string, status: string): Promise<Vehicle> {
    return this.put<Vehicle>(`/vehicles/${vehicleId}/status`, { status });
  }

  // ===== STATISTIQUES =====

  /**
   * Obtenir les statistiques de livraison
   */
  async getDeliveryStats(): Promise<DeliveryStats> {
    return this.get<DeliveryStats>('/stats/deliveries');
  }

  /**
   * Obtenir les statistiques de chauffeurs
   */
  async getDriverStats(): Promise<DriverStats> {
    return this.get<DriverStats>('/stats/drivers');
  }

  // ===== UTILITAIRES =====

  /**
   * Vérifier la santé de l'API
   */
  async healthCheck(): Promise<{ status: string }> {
    return this.get<{ status: string }>('/actuator/health');
  }
}

// Instance singleton du service API
export const apiService = new ApiService();
export default apiService; 