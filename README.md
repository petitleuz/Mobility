# Application de Gestion de Livraison et Mobilité - Sénégal

## Description
Application complète de gestion de livraison et de mobilité au Sénégal avec architecture microservices moderne.

## Architecture

### Technologies utilisées
- **Backend** : Spring Boot 3.2.0 avec Java 17
- **Base de données** : PostgreSQL
- **Message Broker** : Apache Kafka
- **Authentification** : Keycloak
- **Frontend Web** : React (à développer)
- **Application Mobile** : Flutter (à développer)

### Services
- **Backend API** : Port 8081
- **Keycloak** : Port 8080
- **PostgreSQL** : Port 5432
- **Kafka** : Port 9092
- **Zookeeper** : Port 2181

## Structure du projet
```
Mobility/
├── backend/                 # Backend Spring Boot
│   ├── src/main/java/
│   │   └── com/mobility/delivery/
│   │       ├── config/      # Configurations
│   │       ├── controller/  # Contrôleurs REST
│   │       ├── dto/         # Objets de transfert
│   │       ├── entity/      # Entités JPA
│   │       ├── event/       # Événements Kafka
│   │       ├── exception/   # Gestion d'exceptions
│   │       ├── kafka/       # Services Kafka
│   │       ├── mapper/      # Mappers MapStruct
│   │       ├── repository/  # Repositories JPA
│   │       └── service/     # Services métier
│   ├── src/main/resources/
│   └── src/test/
├── frontend/               # Application React (à développer)
├── mobile/                 # Application Flutter (à développer)
├── docs/                   # Documentation
└── delivery_app_architecture.yaml  # Docker Compose
```

## Fonctionnalités principales

### Backend
- ✅ API REST complète pour la gestion des livraisons
- ✅ Intégration Kafka pour les événements
- ✅ Authentification avec Keycloak
- ✅ Base de données PostgreSQL
- ✅ Tests unitaires
- ✅ Documentation API

### Fonctionnalités métier
- ✅ Création de livraisons
- ✅ Suivi de livraisons
- ✅ Gestion des statuts
- ✅ Assignation de chauffeurs
- ✅ Gestion des véhicules
- ✅ Événements en temps réel

## Installation et démarrage

### Prérequis
- Docker et Docker Compose
- Java 17 (pour le développement)
- Maven 3.6+ (pour le développement)

### Démarrage rapide
```bash
# Cloner le projet
git clone <repository-url>
cd Mobility

# Démarrer tous les services
docker-compose -f delivery_app_architecture.yaml up -d

# Vérifier les services
docker-compose -f delivery_app_architecture.yaml ps
```

### Développement local
```bash
# Backend
cd backend
mvn clean compile
mvn spring-boot:run

# Les services externes (PostgreSQL, Kafka, Keycloak) doivent être démarrés
```

## API Documentation
Voir [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) pour la documentation complète de l'API.

## Endpoints principaux
- `POST /api/v1/deliveries` - Créer une livraison
- `GET /api/v1/deliveries/{trackingNumber}` - Récupérer une livraison
- `PUT /api/v1/deliveries/{trackingNumber}/status` - Mettre à jour le statut
- `GET /api/v1/deliveries/tracking/{trackingNumber}` - Suivre une livraison (public)

## Configuration Keycloak
1. Accéder à http://localhost:8080
2. Se connecter avec admin/admin
3. Créer un realm "delivery-realm"
4. Créer un client "delivery-backend"
5. Configurer les utilisateurs et rôles

## Applications développées

### ✅ Backend Spring Boot
- API REST complète avec documentation
- Intégration Kafka pour les événements
- Authentification avec Keycloak
- Base de données PostgreSQL
- Tests unitaires et d'intégration

### ✅ Application Web React
- Interface moderne et responsive
- Authentification avec Keycloak
- Tableau de bord avec statistiques
- Gestion des livraisons en temps réel
- Design adaptatif mobile/desktop

### ✅ Application Mobile Flutter
- Interface native optimisée
- Géolocalisation et cartes
- Scanner QR Code
- Notifications push
- Biométrie et sécurité

## Fonctionnalités par rôle

### 👤 Client
- Suivi de ses livraisons en temps réel
- Notifications push pour les mises à jour
- Historique complet des commandes
- Interface intuitive et moderne

### 🚗 Chauffeur
- Gestion des livraisons assignées
- Navigation GPS intégrée
- Mise à jour des statuts
- Scanner QR Code pour validation
- Signature électronique

### 👨‍💼 Administrateur/Manager
- Tableau de bord complet avec statistiques
- Gestion des chauffeurs et véhicules
- Assignation des livraisons
- Rapports et analyses détaillées
- Monitoring en temps réel

## Prochaines étapes
- [ ] Ajouter des tests d'intégration complets
- [ ] Implémenter la géolocalisation avancée
- [ ] Ajouter des notifications push complètes
- [ ] Optimiser les performances
- [ ] Ajouter des fonctionnalités de paiement
- [ ] Intégrer des services tiers (SMS, email)

## Contribution
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence
Ce projet est sous licence MIT.
