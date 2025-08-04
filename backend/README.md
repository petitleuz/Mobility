# Backend - Application de Gestion de Livraison

## Description
Backend Spring Boot pour l'application de gestion de livraison et de mobilité au Sénégal.

## Technologies utilisées
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security avec Keycloak
- Apache Kafka
- PostgreSQL
- MapStruct
- Lombok

## Prérequis
- Java 17
- Maven 3.6+
- PostgreSQL
- Apache Kafka
- Keycloak

## Configuration

### Base de données PostgreSQL
```sql
CREATE DATABASE delivery_db;
CREATE USER delivery_user WITH PASSWORD 'delivery_pass';
GRANT ALL PRIVILEGES ON DATABASE delivery_db TO delivery_user;
```

### Kafka
Assurez-vous que Kafka est en cours d'exécution avec les topics suivants :
- delivery-events
- driver-events
- vehicle-events

### Keycloak
Configurez un realm "delivery-realm" avec les clients appropriés.

## Installation et exécution

### Développement local
```bash
# Compiler le projet
mvn clean compile

# Exécuter les tests
mvn test

# Démarrer l'application
mvn spring-boot:run
```

### Avec Docker
```bash
# Construire l'image
docker build -t delivery-backend .

# Exécuter le conteneur
docker run -p 8080:8080 delivery-backend
```

## API Endpoints

### Livraisons
- `POST /api/v1/deliveries` - Créer une nouvelle livraison
- `GET /api/v1/deliveries` - Récupérer toutes les livraisons
- `GET /api/v1/deliveries/{trackingNumber}` - Récupérer une livraison par numéro de suivi
- `GET /api/v1/deliveries/status/{status}` - Récupérer les livraisons par statut
- `GET /api/v1/deliveries/driver/{driverId}` - Récupérer les livraisons d'un chauffeur
- `PUT /api/v1/deliveries/{trackingNumber}/status` - Mettre à jour le statut d'une livraison
- `PUT /api/v1/deliveries/{trackingNumber}/assign` - Assigner une livraison à un chauffeur
- `GET /api/v1/deliveries/tracking/{trackingNumber}` - Suivre une livraison (public)

### Authentification
L'API utilise Keycloak pour l'authentification JWT. Incluez le token Bearer dans l'en-tête Authorization.

## Événements Kafka

L'application publie et consomme des événements Kafka pour :
- Création de livraisons
- Mise à jour de statuts
- Assignation de chauffeurs
- Mise à jour de localisation des chauffeurs

## Structure du projet
```
src/main/java/com/mobility/delivery/
├── config/          # Configurations (Kafka, Security)
├── controller/      # Contrôleurs REST
├── dto/            # Objets de transfert de données
├── entity/         # Entités JPA
├── event/          # Événements Kafka
├── exception/      # Gestion d'exceptions
├── kafka/          # Services Kafka
├── mapper/         # Mappers MapStruct
├── repository/     # Repositories JPA
└── service/        # Services métier
``` 