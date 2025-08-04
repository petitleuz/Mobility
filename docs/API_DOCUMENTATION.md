# Documentation API - Application de Gestion de Livraison

## Base URL
```
http://localhost:8081/api/v1
```

## Authentification
L'API utilise Keycloak pour l'authentification JWT. Incluez le token Bearer dans l'en-tête Authorization :
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. Créer une nouvelle livraison
**POST** `/deliveries`

**Corps de la requête :**
```json
{
  "customerName": "John Doe",
  "customerPhone": "+221701234567",
  "pickupAddress": "123 Rue de la Paix, Dakar",
  "deliveryAddress": "456 Avenue Léopold Sédar Senghor, Dakar",
  "pickupCity": "Dakar",
  "deliveryCity": "Dakar",
  "weight": 5.5,
  "price": 2500,
  "notes": "Livraison urgente"
}
```

**Réponse :**
```json
{
  "id": 1,
  "trackingNumber": "DEL123456789",
  "customerName": "John Doe",
  "customerPhone": "+221701234567",
  "pickupAddress": "123 Rue de la Paix, Dakar",
  "deliveryAddress": "456 Avenue Léopold Sédar Senghor, Dakar",
  "pickupCity": "Dakar",
  "deliveryCity": "Dakar",
  "weight": 5.5,
  "price": 2500,
  "status": "PENDING",
  "driverId": "",
  "vehicleId": "",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00",
  "pickupTime": null,
  "deliveryTime": null,
  "notes": "Livraison urgente"
}
```

### 2. Récupérer une livraison par numéro de suivi
**GET** `/deliveries/{trackingNumber}`

**Réponse :**
```json
{
  "id": 1,
  "trackingNumber": "DEL123456789",
  "customerName": "John Doe",
  "customerPhone": "+221701234567",
  "pickupAddress": "123 Rue de la Paix, Dakar",
  "deliveryAddress": "456 Avenue Léopold Sédar Senghor, Dakar",
  "pickupCity": "Dakar",
  "deliveryCity": "Dakar",
  "weight": 5.5,
  "price": 2500,
  "status": "PENDING",
  "driverId": "",
  "vehicleId": "",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00",
  "pickupTime": null,
  "deliveryTime": null,
  "notes": "Livraison urgente"
}
```

### 3. Récupérer toutes les livraisons
**GET** `/deliveries`

**Réponse :**
```json
[
  {
    "id": 1,
    "trackingNumber": "DEL123456789",
    "customerName": "John Doe",
    "status": "PENDING"
  },
  {
    "id": 2,
    "trackingNumber": "DEL987654321",
    "customerName": "Jane Smith",
    "status": "IN_TRANSIT"
  }
]
```

### 4. Récupérer les livraisons par statut
**GET** `/deliveries/status/{status}`

**Statuts disponibles :**
- PENDING
- ASSIGNED
- PICKUP_IN_PROGRESS
- PICKED_UP
- IN_TRANSIT
- OUT_FOR_DELIVERY
- DELIVERED
- FAILED
- CANCELLED

### 5. Récupérer les livraisons d'un chauffeur
**GET** `/deliveries/driver/{driverId}`

### 6. Mettre à jour le statut d'une livraison
**PUT** `/deliveries/{trackingNumber}/status`

**Corps de la requête :**
```json
{
  "status": "PICKED_UP",
  "notes": "Colis récupéré avec succès"
}
```

### 7. Assigner une livraison à un chauffeur
**PUT** `/deliveries/{trackingNumber}/assign?driverId={driverId}&vehicleId={vehicleId}`

### 8. Suivre une livraison (public)
**GET** `/deliveries/tracking/{trackingNumber}`

*Cet endpoint est public et ne nécessite pas d'authentification.*

## Codes de statut HTTP

- **200 OK** : Requête réussie
- **201 Created** : Ressource créée avec succès
- **400 Bad Request** : Données invalides
- **401 Unauthorized** : Authentification requise
- **403 Forbidden** : Accès refusé
- **404 Not Found** : Ressource non trouvée
- **500 Internal Server Error** : Erreur serveur

## Événements Kafka

L'API publie automatiquement des événements Kafka lors des opérations suivantes :

### Topics
- `delivery-events` : Événements de livraison
- `driver-events` : Événements de chauffeur
- `vehicle-events` : Événements de véhicule

### Types d'événements
- `delivery-created` : Nouvelle livraison créée
- `delivery-assigned` : Livraison assignée à un chauffeur
- `delivery-status-updated` : Statut de livraison mis à jour
- `delivery-picked-up` : Livraison ramassée
- `delivery-in-transit` : Livraison en transit
- `delivery-out-for-delivery` : Livraison en cours
- `delivery-delivered` : Livraison terminée
- `delivery-failed` : Échec de livraison
- `delivery-cancelled` : Livraison annulée

## Exemples d'utilisation

### Créer une livraison avec cURL
```bash
curl -X POST http://localhost:8081/api/v1/deliveries \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "customerName": "John Doe",
    "customerPhone": "+221701234567",
    "pickupAddress": "123 Rue de la Paix, Dakar",
    "deliveryAddress": "456 Avenue Léopold Sédar Senghor, Dakar",
    "pickupCity": "Dakar",
    "deliveryCity": "Dakar",
    "weight": 5.5,
    "price": 2500,
    "notes": "Livraison urgente"
  }'
```

### Suivre une livraison (public)
```bash
curl -X GET http://localhost:8081/api/v1/deliveries/tracking/DEL123456789
``` 