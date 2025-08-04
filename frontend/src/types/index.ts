/**
 * Types TypeScript pour l'application de gestion de livraison
 * Définit toutes les interfaces et types utilisés dans l'application
 */

// Types d'utilisateur
export enum UserRole {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

// Types de livraison
export enum DeliveryStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  PICKUP_IN_PROGRESS = 'PICKUP_IN_PROGRESS',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export interface Delivery {
  id: number;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupCity: string;
  deliveryCity: string;
  weight: number;
  price: number;
  status: DeliveryStatus;
  driverId: string;
  vehicleId: string;
  createdAt: string;
  updatedAt: string;
  pickupTime?: string;
  deliveryTime?: string;
  notes?: string;
}

export interface CreateDeliveryRequest {
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupCity: string;
  deliveryCity: string;
  weight: number;
  price: number;
  notes?: string;
}

export interface UpdateDeliveryStatusRequest {
  status: DeliveryStatus;
  notes?: string;
}

// Types de chauffeur
export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  ON_DELIVERY = 'ON_DELIVERY',
  ON_BREAK = 'ON_BREAK'
}

export interface Driver {
  id: number;
  driverId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
  status: DriverStatus;
  currentLocation: string;
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
  avatar?: string;
  rating?: number;
  totalDeliveries?: number;
}

// Types de véhicule
export enum VehicleType {
  MOTORCYCLE = 'MOTORCYCLE',
  CAR = 'CAR',
  VAN = 'VAN',
  TRUCK = 'TRUCK',
  BICYCLE = 'BICYCLE'
}

export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  MAINTENANCE = 'MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}

export interface Vehicle {
  id: number;
  vehicleId: string;
  brand: string;
  model: string;
  licensePlate: string;
  color: string;
  type: VehicleType;
  status: VehicleStatus;
  driverId: string;
  createdAt: string;
  updatedAt: string;
  lastMaintenanceAt?: string;
}

// Types d'authentification
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Types d'API
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Types de localisation
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Types de notifications
export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Types de statistiques
export interface DeliveryStats {
  total: number;
  pending: number;
  inTransit: number;
  delivered: number;
  failed: number;
  revenue: number;
}

export interface DriverStats {
  totalDrivers: number;
  availableDrivers: number;
  busyDrivers: number;
  offlineDrivers: number;
}

// Types de filtres
export interface DeliveryFilters {
  status?: DeliveryStatus;
  driverId?: string;
  dateFrom?: string;
  dateTo?: string;
  city?: string;
}

export interface DriverFilters {
  status?: DriverStatus;
  city?: string;
  available?: boolean;
}

// Types de formulaires
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Types de navigation
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
  badge?: number;
}

// Types de tableaux
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

// Types d'événements
export interface DeliveryEvent {
  eventId: string;
  eventType: string;
  timestamp: string;
  trackingNumber: string;
  deliveryId: number;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupCity: string;
  deliveryCity: string;
  weight: number;
  price: number;
  status: DeliveryStatus;
  driverId: string;
  vehicleId: string;
  notes?: string;
} 