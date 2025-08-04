package com.mobility.delivery.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mobility.delivery.event.DeliveryEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {
    
    private final ObjectMapper objectMapper;
    
    @KafkaListener(topics = "${kafka.topics.delivery-events}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDeliveryEvents(String message) {
        try {
            DeliveryEvent event = objectMapper.readValue(message, DeliveryEvent.class);
            log.info("Received delivery event: {}", event.getEventId());
            
            // Traitement des événements selon le type
            switch (event.getEventType()) {
                case "delivery-created":
                    handleDeliveryCreated(event);
                    break;
                case "delivery-status-updated":
                    handleDeliveryStatusUpdated(event);
                    break;
                case "delivery-delivered":
                    handleDeliveryDelivered(event);
                    break;
                default:
                    log.info("Event type not handled: {}", event.getEventType());
            }
        } catch (Exception e) {
            log.error("Error processing delivery event: {}", e.getMessage());
        }
    }
    
    @KafkaListener(topics = "${kafka.topics.driver-events}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeDriverEvents(String message) {
        try {
            log.info("Received driver event: {}", message);
            // Traitement des événements de chauffeur
        } catch (Exception e) {
            log.error("Error processing driver event: {}", e.getMessage());
        }
    }
    
    @KafkaListener(topics = "${kafka.topics.vehicle-events}", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeVehicleEvents(String message) {
        try {
            log.info("Received vehicle event: {}", message);
            // Traitement des événements de véhicule
        } catch (Exception e) {
            log.error("Error processing vehicle event: {}", e.getMessage());
        }
    }
    
    private void handleDeliveryCreated(DeliveryEvent event) {
        log.info("Handling delivery created event for tracking number: {}", event.getTrackingNumber());
        // Logique de traitement pour une nouvelle livraison
    }
    
    private void handleDeliveryStatusUpdated(DeliveryEvent event) {
        log.info("Handling delivery status updated event for tracking number: {}", event.getTrackingNumber());
        // Logique de traitement pour mise à jour de statut
    }
    
    private void handleDeliveryDelivered(DeliveryEvent event) {
        log.info("Handling delivery delivered event for tracking number: {}", event.getTrackingNumber());
        // Logique de traitement pour livraison terminée
    }
} 