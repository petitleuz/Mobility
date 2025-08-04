/**
 * Constantes de l'application Flutter
 * Définit toutes les valeurs constantes utilisées dans l'application
 */

class AppConstants {
  // Configuration de l'API
  static const String apiBaseUrl = 'http://localhost:8081/api/v1';
  static const String apiTimeout = '30s';
  
  // Configuration de l'application
  static const String appName = 'Mobility';
  static const String appVersion = '1.0.0';
  static const String appDescription = 'Application de gestion de livraison et mobilité au Sénégal';
  
  // Clés de stockage local
  static const String tokenKey = 'auth_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userKey = 'user_data';
  static const String settingsKey = 'app_settings';
  
  // Configuration des notifications
  static const String notificationChannelId = 'delivery_notifications';
  static const String notificationChannelName = 'Notifications de livraison';
  static const String notificationChannelDescription = 'Notifications pour le suivi des livraisons';
  
  // Configuration de la géolocalisation
  static const double defaultLatitude = 14.7167; // Dakar
  static const double defaultLongitude = -17.4677;
  static const int locationUpdateInterval = 30000; // 30 secondes
  static const double locationAccuracy = 10.0; // 10 mètres
  
  // Configuration des cartes
  static const String googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  static const double defaultZoom = 15.0;
  static const double maxZoom = 18.0;
  static const double minZoom = 10.0;
  
  // Configuration des animations
  static const Duration shortAnimationDuration = Duration(milliseconds: 200);
  static const Duration mediumAnimationDuration = Duration(milliseconds: 300);
  static const Duration longAnimationDuration = Duration(milliseconds: 500);
  
  // Configuration des délais
  static const Duration apiTimeoutDuration = Duration(seconds: 30);
  static const Duration cacheTimeoutDuration = Duration(minutes: 5);
  static const Duration sessionTimeoutDuration = Duration(hours: 24);
  
  // Configuration des limites
  static const int maxRetryAttempts = 3;
  static const int maxImageSize = 5 * 1024 * 1024; // 5 MB
  static const int maxDeliveryHistory = 100;
  
  // Messages d'erreur
  static const String networkErrorMessage = 'Erreur de connexion. Veuillez vérifier votre connexion internet.';
  static const String serverErrorMessage = 'Erreur du serveur. Veuillez réessayer plus tard.';
  static const String timeoutErrorMessage = 'Délai d\'attente dépassé. Veuillez réessayer.';
  static const String unauthorizedErrorMessage = 'Session expirée. Veuillez vous reconnecter.';
  static const String unknownErrorMessage = 'Une erreur inattendue s\'est produite.';
  
  // Messages de succès
  static const String loginSuccessMessage = 'Connexion réussie !';
  static const String logoutSuccessMessage = 'Déconnexion réussie !';
  static const String deliveryCreatedMessage = 'Livraison créée avec succès !';
  static const String deliveryUpdatedMessage = 'Livraison mise à jour avec succès !';
  static const String profileUpdatedMessage = 'Profil mis à jour avec succès !';
  
  // Validation
  static const String emailRequiredMessage = 'L\'email est requis';
  static const String passwordRequiredMessage = 'Le mot de passe est requis';
  static const String passwordMinLengthMessage = 'Le mot de passe doit contenir au moins 6 caractères';
  static const String phoneRequiredMessage = 'Le numéro de téléphone est requis';
  static const String nameRequiredMessage = 'Le nom est requis';
  static const String addressRequiredMessage = 'L\'adresse est requise';
  static const String cityRequiredMessage = 'La ville est requise';
  static const String weightRequiredMessage = 'Le poids est requis';
  static const String priceRequiredMessage = 'Le prix est requis';
  
  // Formats
  static const String dateFormat = 'dd/MM/yyyy';
  static const String timeFormat = 'HH:mm';
  static const String dateTimeFormat = 'dd/MM/yyyy HH:mm';
  static const String currencyFormat = '#,##0.00 FCFA';
  static const String weightFormat = '#,##0.0 kg';
  
  // Couleurs
  static const int primaryColorValue = 0xFF3B82F6;
  static const int secondaryColorValue = 0xFF64748B;
  static const int successColorValue = 0xFF10B981;
  static const int warningColorValue = 0xFFF59E0B;
  static const int errorColorValue = 0xFFEF4444;
  static const int infoColorValue = 0xFF06B6D4;
  
  // Tailles
  static const double smallPadding = 8.0;
  static const double mediumPadding = 16.0;
  static const double largePadding = 24.0;
  static const double extraLargePadding = 32.0;
  
  static const double smallRadius = 4.0;
  static const double mediumRadius = 8.0;
  static const double largeRadius = 12.0;
  static const double extraLargeRadius = 16.0;
  
  // Durées d'animation
  static const Duration fastAnimation = Duration(milliseconds: 150);
  static const Duration normalAnimation = Duration(milliseconds: 300);
  static const Duration slowAnimation = Duration(milliseconds: 500);
  
  // Configuration des permissions
  static const List<String> requiredPermissions = [
    'location',
    'camera',
    'notification',
  ];
  
  // Configuration des tests
  static const bool enableAnalytics = true;
  static const bool enableCrashlytics = true;
  static const bool enablePerformanceMonitoring = true;
  
  // Configuration de développement
  static const bool isDevelopment = true;
  static const bool enableDebugLogs = true;
  static const bool enableNetworkLogs = true;
  
  // URLs
  static const String privacyPolicyUrl = 'https://mobility.sn/privacy';
  static const String termsOfServiceUrl = 'https://mobility.sn/terms';
  static const String supportUrl = 'https://mobility.sn/support';
  static const String websiteUrl = 'https://mobility.sn';
  
  // Configuration des langues
  static const String defaultLanguage = 'fr';
  static const List<String> supportedLanguages = ['fr', 'en'];
  
  // Configuration des fuseaux horaires
  static const String defaultTimeZone = 'Africa/Dakar';
  
  // Configuration des unités
  static const String weightUnit = 'kg';
  static const String distanceUnit = 'km';
  static const String currencyUnit = 'FCFA';
  
  // Configuration des notifications push
  static const String fcmTokenKey = 'fcm_token';
  static const String notificationSettingsKey = 'notification_settings';
  
  // Configuration de la sécurité
  static const bool enableBiometricAuth = true;
  static const bool enableAutoLock = true;
  static const int autoLockTimeout = 300; // 5 minutes
  
  // Configuration du cache
  static const int maxCacheSize = 50 * 1024 * 1024; // 50 MB
  static const Duration cacheExpiration = Duration(days: 7);
  
  // Configuration des mises à jour
  static const String updateCheckUrl = 'https://mobility.sn/api/updates';
  static const bool enableAutoUpdate = true;
  
  // Configuration des rapports
  static const bool enableCrashReports = true;
  static const bool enableUsageAnalytics = true;
  static const bool enablePerformanceMetrics = true;
}

/// Constantes pour les statuts de livraison
class DeliveryStatusConstants {
  static const String pending = 'PENDING';
  static const String assigned = 'ASSIGNED';
  static const String pickupInProgress = 'PICKUP_IN_PROGRESS';
  static const String pickedUp = 'PICKED_UP';
  static const String inTransit = 'IN_TRANSIT';
  static const String outForDelivery = 'OUT_FOR_DELIVERY';
  static const String delivered = 'DELIVERED';
  static const String failed = 'FAILED';
  static const String cancelled = 'CANCELLED';
}

/// Constantes pour les rôles utilisateur
class UserRoleConstants {
  static const String client = 'CLIENT';
  static const String driver = 'DRIVER';
  static const String admin = 'ADMIN';
  static const String manager = 'MANAGER';
}

/// Constantes pour les types de véhicules
class VehicleTypeConstants {
  static const String motorcycle = 'MOTORCYCLE';
  static const String car = 'CAR';
  static const String van = 'VAN';
  static const String truck = 'TRUCK';
  static const String bicycle = 'BICYCLE';
} 