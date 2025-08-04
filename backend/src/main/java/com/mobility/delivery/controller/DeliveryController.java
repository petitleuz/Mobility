package com.mobility.delivery.controller;

import com.mobility.delivery.dto.CreateDeliveryRequest;
import com.mobility.delivery.dto.DeliveryDto;
import com.mobility.delivery.dto.UpdateDeliveryStatusRequest;
import com.mobility.delivery.entity.DeliveryStatus;
import com.mobility.delivery.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/deliveries")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class DeliveryController {
    
    private final DeliveryService deliveryService;
    
    @PostMapping
    public ResponseEntity<DeliveryDto> createDelivery(@Valid @RequestBody CreateDeliveryRequest request) {
        log.info("Creating new delivery for customer: {}", request.getCustomerName());
        DeliveryDto delivery = deliveryService.createDelivery(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(delivery);
    }
    
    @GetMapping("/{trackingNumber}")
    public ResponseEntity<DeliveryDto> getDeliveryByTrackingNumber(@PathVariable String trackingNumber) {
        log.info("Getting delivery by tracking number: {}", trackingNumber);
        DeliveryDto delivery = deliveryService.getDeliveryByTrackingNumber(trackingNumber);
        return ResponseEntity.ok(delivery);
    }
    
    @GetMapping
    public ResponseEntity<List<DeliveryDto>> getAllDeliveries() {
        log.info("Getting all deliveries");
        List<DeliveryDto> deliveries = deliveryService.getAllDeliveries();
        return ResponseEntity.ok(deliveries);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<DeliveryDto>> getDeliveriesByStatus(@PathVariable DeliveryStatus status) {
        log.info("Getting deliveries by status: {}", status);
        List<DeliveryDto> deliveries = deliveryService.getDeliveriesByStatus(status);
        return ResponseEntity.ok(deliveries);
    }
    
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<DeliveryDto>> getDeliveriesByDriver(@PathVariable String driverId) {
        log.info("Getting deliveries by driver: {}", driverId);
        List<DeliveryDto> deliveries = deliveryService.getDeliveriesByDriver(driverId);
        return ResponseEntity.ok(deliveries);
    }
    
    @PutMapping("/{trackingNumber}/status")
    public ResponseEntity<DeliveryDto> updateDeliveryStatus(
            @PathVariable String trackingNumber,
            @Valid @RequestBody UpdateDeliveryStatusRequest request) {
        log.info("Updating delivery status for tracking number: {} to {}", trackingNumber, request.getStatus());
        DeliveryDto delivery = deliveryService.updateDeliveryStatus(trackingNumber, request);
        return ResponseEntity.ok(delivery);
    }
    
    @PutMapping("/{trackingNumber}/assign")
    public ResponseEntity<DeliveryDto> assignDeliveryToDriver(
            @PathVariable String trackingNumber,
            @RequestParam String driverId,
            @RequestParam String vehicleId) {
        log.info("Assigning delivery {} to driver {} with vehicle {}", trackingNumber, driverId, vehicleId);
        DeliveryDto delivery = deliveryService.assignDeliveryToDriver(trackingNumber, driverId, vehicleId);
        return ResponseEntity.ok(delivery);
    }
    
    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<DeliveryDto> trackDelivery(@PathVariable String trackingNumber) {
        log.info("Tracking delivery: {}", trackingNumber);
        DeliveryDto delivery = deliveryService.getDeliveryByTrackingNumber(trackingNumber);
        return ResponseEntity.ok(delivery);
    }
} 