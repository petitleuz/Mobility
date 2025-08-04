# Application Mobile Flutter - Mobility

## Description
Application mobile Flutter pour la gestion de livraison et de mobilité au Sénégal. Interface native optimisée pour les chauffeurs et clients avec fonctionnalités avancées.

## Technologies utilisées
- **Flutter 3.0+** avec Dart
- **Riverpod** pour la gestion d'état
- **Go Router** pour la navigation
- **Dio** avec Retrofit pour les API
- **Hive** pour le stockage local
- **Google Maps** pour la géolocalisation
- **Local Auth** pour la biométrie
- **QR Code** pour le scanning
- **Push Notifications** pour les alertes

## Fonctionnalités

### 🔐 Authentification
- Connexion sécurisée avec biométrie
- Gestion des rôles (Client, Chauffeur)
- Protection des données sensibles
- Session persistante

### 📱 Interface native
- Design Material 3
- Thème clair/sombre automatique
- Animations fluides
- Navigation intuitive
- Support multilingue

### 🚚 Gestion des livraisons
- Création de livraisons
- Suivi en temps réel
- Mise à jour des statuts
- Historique complet
- Notifications push

### 📍 Géolocalisation
- Suivi GPS en temps réel
- Cartes interactives
- Optimisation des trajets
- Historique des positions

### 📷 Fonctionnalités avancées
- Scanner QR Code
- Capture de photos
- Signature électronique
- Partage de documents

### 🔔 Notifications
- Notifications push
- Alertes de livraison
- Rappels automatiques
- Sons et vibrations

## Installation et démarrage

### Prérequis
- Flutter SDK 3.0+
- Android Studio / Xcode
- Backend Spring Boot en cours d'exécution

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd mobile

# Installer les dépendances
flutter pub get

# Générer les fichiers de code
flutter packages pub run build_runner build

# Démarrer l'application
flutter run
```

### Configuration
Créer un fichier `lib/config/app_config.dart` :
```dart
class AppConfig {
  static const String apiBaseUrl = 'http://localhost:8081/api/v1';
  static const String googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  static const String fcmServerKey = 'YOUR_FCM_SERVER_KEY';
}
```

## Structure du projet
```
lib/
├── main.dart              # Point d'entrée
├── models/                # Modèles de données
├── screens/               # Écrans de l'application
│   ├── auth/             # Écrans d'authentification
│   ├── dashboard/        # Tableau de bord
│   ├── delivery/         # Gestion des livraisons
│   ├── tracking/         # Suivi en temps réel
│   └── profile/          # Profil utilisateur
├── services/             # Services (API, localisation, etc.)
├── providers/            # Providers Riverpod
├── widgets/              # Widgets réutilisables
├── utils/                # Utilitaires
├── constants/            # Constantes
└── assets/               # Ressources (images, fonts, etc.)
```

## Architecture

### Gestion d'état
- **Riverpod** pour la gestion d'état globale
- **Provider** pour l'injection de dépendances
- **StateNotifier** pour la logique métier

### Navigation
- **Go Router** avec protection des routes
- Navigation basée sur les rôles
- Deep linking support

### API
- **Dio** avec intercepteurs pour l'authentification
- **Retrofit** pour la génération de code API
- Gestion automatique des erreurs et retry

### Stockage local
- **Hive** pour les données persistantes
- **SharedPreferences** pour les paramètres
- Chiffrement des données sensibles

## Fonctionnalités par rôle

### 👤 Client
- Suivi de ses livraisons
- Notifications en temps réel
- Historique des commandes
- Profil et paramètres

### 🚗 Chauffeur
- Gestion des livraisons assignées
- Mise à jour des statuts
- Navigation GPS intégrée
- Scanner QR Code
- Signature électronique

## Déploiement

### Android
```bash
# Construire l'APK
flutter build apk --release

# Construire l'AAB pour Google Play
flutter build appbundle --release
```

### iOS
```bash
# Construire pour iOS
flutter build ios --release

# Archiver pour App Store
flutter build ipa --release
```

### Configuration Firebase
1. Créer un projet Firebase
2. Ajouter les applications Android/iOS
3. Télécharger les fichiers de configuration
4. Configurer les notifications push

## Tests

### Tests unitaires
```bash
flutter test
```

### Tests d'intégration
```bash
flutter test integration_test/
```

### Tests de widgets
```bash
flutter test test/widget_test.dart
```

## Performance

### Optimisations
- Lazy loading des images
- Cache intelligent des données
- Optimisation des requêtes réseau
- Compression des assets

### Monitoring
- Crashlytics pour les erreurs
- Analytics pour l'usage
- Performance monitoring
- Métriques personnalisées

## Sécurité

### Authentification
- JWT tokens avec expiration
- Biométrie (empreinte/face)
- Chiffrement des données sensibles
- Validation des entrées

### Protection des données
- Chiffrement local avec Hive
- Transmission sécurisée HTTPS
- Validation côté client et serveur
- Gestion sécurisée des tokens

## Permissions requises

### Android
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

### iOS
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Cette application nécessite l'accès à la localisation pour le suivi des livraisons.</string>
<key>NSCameraUsageDescription</key>
<string>Cette application nécessite l'accès à la caméra pour scanner les QR codes.</string>
```

## Configuration des notifications

### Android
- Configuration Firebase Cloud Messaging
- Canaux de notification personnalisés
- Sons et vibrations
- Actions de notification

### iOS
- Configuration APNs
- Permissions de notification
- Badge count
- Actions de notification

## Support

### Documentation
- [Guide utilisateur](docs/user-guide.md)
- [Guide développeur](docs/developer-guide.md)
- [API Documentation](docs/api-documentation.md)

### Contact
- Email: support@mobility.sn
- Documentation: https://mobility.sn/docs
- Issues: GitHub Issues

## Contribution

### Guidelines
1. Fork le projet
2. Créer une branche feature
3. Suivre les conventions de code Dart/Flutter
4. Ajouter des tests
5. Créer une Pull Request

### Standards de code
- Dart analyzer strict mode
- Flutter lints
- Tests unitaires obligatoires
- Documentation des APIs

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails. 