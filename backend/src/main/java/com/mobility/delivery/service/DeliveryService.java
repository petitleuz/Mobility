package com.mobility.delivery.service;

import com.mobility.delivery.dto.CreateDeliveryRequest;
import com.mobility.delivery.dto.DeliveryDto;
import com.mobility.delivery.dto.UpdateDeliveryStatusRequest;
import com.mobility.delivery.entity.Delivery;
import com.mobility.delivery.entity.DeliveryStatus;
import com.mobility.delivery.event.DeliveryEvent;
import com.mobility.delivery.event.EventType;
import com.mobility.delivery.exception.DeliveryNotFoundException;
import com.mobility.delivery.kafka.KafkaProducerService;
import com.mobility.delivery.mapper.DeliveryMapper;
import com.mobility.delivery.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeliveryService {
    
    private final DeliveryRepository deliveryRepository;
    private final DeliveryMapper deliveryMapper;
    private final KafkaProducerService kafkaProducerService;
    
    @Transactional
    public DeliveryDto createDelivery(CreateDeliveryRequest request) {
        log.info("Creating new delivery for customer: {}", request.getCustomerName());
        
        // Générer un numéro de suivi unique
        String trackingNumber = generateTrackingNumber();
        
        // Créer l'entité Delivery
        Delivery delivery = Delivery.builder()
                .trackingNumber(trackingNumber)
                .customerName(request.getCustomerName())
                .customerPhone(request.getCustomerPhone())
                .pickupAddress(request.getPickupAddress())
                .deliveryAddress(request.getDeliveryAddress())
                .pickupCity(request.getPickupCity())
                .deliveryCity(request.getDeliveryCity())
                .weight(request.getWeight())
                .price(request.getPrice())
                .status(DeliveryStatus.PENDING)
                .driverId("") // Sera assigné plus tard
                .vehicleId("") // Sera assigné plus tard
                .notes(request.getNotes())
                .build();
        
        // Sauvegarder en base
        Delivery savedDelivery = deliveryRepository.save(delivery);
        
        // Publier l'événement Kafka
        publishDeliveryEvent(savedDelivery, EventType.DELIVERY_CREATED);
        
        log.info("Delivery created successfully with tracking number: {}", trackingNumber);
        return deliveryMapper.toDto(savedDelivery);
    }
    
    @Transactional(readOnly = true)
    public DeliveryDto getDeliveryByTrackingNumber(String trackingNumber) {
        log.info("Getting delivery by tracking number: {}", trackingNumber);
        
        Delivery delivery = deliveryRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found with tracking number: " + trackingNumber));
        
        return deliveryMapper.toDto(delivery);
    }
    
    @Transactional(readOnly = true)
    public List<DeliveryDto> getAllDeliveries() {
        log.info("Getting all deliveries");
        List<Delivery> deliveries = deliveryRepository.findAll();
        return deliveryMapper.toDtoList(deliveries);
    }
    
    @Transactional(readOnly = true)
    public List<DeliveryDto> getDeliveriesByStatus(DeliveryStatus status) {
        log.info("Getting deliveries by status: {}", status);
        List<Delivery> deliveries = deliveryRepository.findByStatus(status);
        return deliveryMapper.toDtoList(deliveries);
    }
    
    @Transactional(readOnly = true)
    public List<DeliveryDto> getDeliveriesByDriver(String driverId) {
        log.info("Getting deliveries by driver: {}", driverId);
        List<Delivery> deliveries = deliveryRepository.findByDriverId(driverId);
        return deliveryMapper.toDtoList(deliveries);
    }
    
    @Transactional
    public DeliveryDto updateDeliveryStatus(String trackingNumber, UpdateDeliveryStatusRequest request) {
        log.info("Updating delivery status for tracking number: {} to {}", trackingNumber, request.getStatus());
        
        Delivery delivery = deliveryRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found with tracking number: " + trackingNumber));
        
        DeliveryStatus oldStatus = delivery.getStatus();
        delivery.setStatus(request.getStatus());
        
        // Mettre à jour les timestamps selon le statut
        if (request.getStatus() == DeliveryStatus.PICKED_UP) {
            delivery.setPickupTime(LocalDateTime.now());
        } else if (request.getStatus() == DeliveryStatus.DELIVERED) {
            delivery.setDeliveryTime(LocalDateTime.now());
        }
        
        if (request.getNotes() != null) {
            delivery.setNotes(request.getNotes());
        }
        
        Delivery updatedDelivery = deliveryRepository.save(delivery);
        
        // Publier l'événement Kafka
        publishDeliveryEvent(updatedDelivery, EventType.DELIVERY_STATUS_UPDATED);
        
        log.info("Delivery status updated successfully from {} to {}", oldStatus, request.getStatus());
        return deliveryMapper.toDto(updatedDelivery);
    }
    
    @Transactional
    public DeliveryDto assignDeliveryToDriver(String trackingNumber, String driverId, String vehicleId) {
        log.info("Assigning delivery {} to driver {} with vehicle {}", trackingNumber, driverId, vehicleId);
        
        Delivery delivery = deliveryRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found with tracking number: " + trackingNumber));
        
        delivery.setDriverId(driverId);
        delivery.setVehicleId(vehicleId);
        delivery.setStatus(DeliveryStatus.ASSIGNED);
        
        Delivery updatedDelivery = deliveryRepository.save(delivery);
        
        // Publier l'événement Kafka
        publishDeliveryEvent(updatedDelivery, EventType.DELIVERY_ASSIGNED);
        
        log.info("Delivery assigned successfully to driver: {}", driverId);
        return deliveryMapper.toDto(updatedDelivery);
    }
    
    private String generateTrackingNumber() {
        return "DEL" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private void publishDeliveryEvent(Delivery delivery, EventType eventType) {
        try {
            DeliveryEvent event = DeliveryEvent.builder()
                    .eventId(UUID.randomUUID().toString())
                    .eventType(eventType.getValue())
                    .timestamp(LocalDateTime.now())
                    .trackingNumber(delivery.getTrackingNumber())
                    .deliveryId(delivery.getId())
                    .customerName(delivery.getCustomerName())
                    .customerPhone(delivery.getCustomerPhone())
                    .pickupAddress(delivery.getPickupAddress())
                    .deliveryAddress(delivery.getDeliveryAddress())
                    .pickupCity(delivery.getPickupCity())
                    .deliveryCity(delivery.getDeliveryCity())
                    .weight(delivery.getWeight())
                    .price(delivery.getPrice())
                    .status(delivery.getStatus())
                    .driverId(delivery.getDriverId())
                    .vehicleId(delivery.getVehicleId())
                    .notes(delivery.getNotes())
                    .build();
            
            kafkaProducerService.sendDeliveryEvent("delivery-events", event);
        } catch (Exception e) {
            log.error("Error publishing delivery event: {}", e.getMessage());
        }
    }
} 