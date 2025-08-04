FROM openjdk:17-jdk-slim

WORKDIR /app

# Copier le fichier JAR
COPY target/delivery-backend-1.0.0.jar app.jar

# Exposer le port
EXPOSE 8080

# Commande pour démarrer l'application
ENTRYPOINT ["java", "-jar", "app.jar"] 