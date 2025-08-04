# Application Web React - Mobility

## Description
Application web React pour la gestion de livraison et de mobilité au Sénégal. Interface moderne et intuitive pour les clients, chauffeurs et administrateurs.

## Technologies utilisées
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **React Router DOM** pour la navigation
- **React Query** pour la gestion des données
- **Zustand** pour la gestion d'état
- **React Hook Form** pour les formulaires
- **Lucide React** pour les icônes
- **Axios** pour les requêtes HTTP
- **React Hot Toast** pour les notifications

## Fonctionnalités

### 🔐 Authentification
- Connexion sécurisée avec Keycloak
- Gestion des rôles (Client, Chauffeur, Admin, Manager)
- Protection des routes selon les permissions
- Tokens JWT avec rafraîchissement automatique

### 📊 Tableau de bord
- Statistiques en temps réel
- Graphiques de performance
- Aperçu des livraisons récentes
- Actions rapides selon le rôle

### 🚚 Gestion des livraisons
- Création de nouvelles livraisons
- Suivi en temps réel
- Mise à jour des statuts
- Historique complet
- Filtres et recherche avancée

### 👥 Gestion des utilisateurs
- Profils clients et chauffeurs
- Gestion des véhicules
- Assignation des livraisons
- Suivi des performances

### 📱 Interface responsive
- Design adaptatif mobile/desktop
- Navigation intuitive
- Animations fluides
- Thème clair/sombre

## Installation et démarrage

### Prérequis
- Node.js 16+
- npm ou yarn
- Backend Spring Boot en cours d'exécution

### Installation
```bash
# Installer les dépendances
npm install

# Démarrer l'application en mode développement
npm start

# Construire pour la production
npm run build

# Lancer les tests
npm test
```

### Configuration
Créer un fichier `.env` à la racine du projet :
```env
REACT_APP_API_URL=http://localhost:8081/api/v1
REACT_APP_KEYCLOAK_URL=http://localhost:8080/auth
REACT_APP_REALM=delivery-realm
REACT_APP_CLIENT_ID=delivery-frontend
```

## Structure du projet
```
src/
├── components/          # Composants réutilisables
│   ├── auth/           # Composants d'authentification
│   ├── dashboard/      # Composants du tableau de bord
│   ├── delivery/       # Composants de livraison
│   ├── layout/         # Composants de mise en page
│   └── ui/             # Composants UI génériques
├── contexts/           # Contextes React (Zustand stores)
├── hooks/              # Hooks personnalisés
├── pages/              # Pages de l'application
├── services/           # Services API
├── types/              # Types TypeScript
├── utils/              # Utilitaires
└── assets/             # Ressources statiques
```

## Architecture

### Gestion d'état
- **Zustand** pour l'authentification et les préférences
- **React Query** pour le cache et la synchronisation des données
- **Context API** pour les thèmes et les paramètres globaux

### Navigation
- **React Router DOM** avec protection des routes
- Navigation basée sur les rôles
- Redirection automatique selon l'authentification

### API
- **Axios** avec intercepteurs pour l'authentification
- Gestion automatique des erreurs
- Retry automatique pour les requêtes échouées

## Déploiement

### Production
```bash
# Construire l'application
npm run build

# Servir avec nginx ou serveur web
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Tests

### Tests unitaires
```bash
npm test
```

### Tests d'intégration
```bash
npm run test:integration
```

### Couverture de code
```bash
npm run test:coverage
```

## Performance

### Optimisations
- Code splitting avec React.lazy()
- Memoization des composants
- Optimisation des images
- Compression gzip/brotli

### Monitoring
- Métriques de performance
- Suivi des erreurs
- Analytics utilisateur

## Sécurité

### Authentification
- JWT tokens avec expiration
- Refresh tokens automatiques
- Protection CSRF
- Validation des entrées

### Autorisation
- Contrôle d'accès basé sur les rôles
- Protection des routes sensibles
- Validation côté client et serveur

## Contribution

### Guidelines
1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Créer une Pull Request

### Standards de code
- ESLint pour le linting
- Prettier pour le formatage
- TypeScript strict mode
- Tests unitaires obligatoires

## Support

### Documentation
- [Guide utilisateur](docs/user-guide.md)
- [Guide développeur](docs/developer-guide.md)
- [API Documentation](docs/api-documentation.md)

### Contact
- Email: support@mobility.sn
- Documentation: https://mobility.sn/docs
- Issues: GitHub Issues

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails. 