package com.mobility.delivery.event;

import com.mobility.delivery.entity.DeliveryStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryEvent {
    
    private String eventId;
    private String eventType;
    private LocalDateTime timestamp;
    private String trackingNumber;
    private Long deliveryId;
    private String customerName;
    private String customerPhone;
    private String pickupAddress;
    private String deliveryAddress;
    private String pickupCity;
    private String deliveryCity;
    private BigDecimal weight;
    private BigDecimal price;
    private DeliveryStatus status;
    private String driverId;
    private String vehicleId;
    private String notes;
} 