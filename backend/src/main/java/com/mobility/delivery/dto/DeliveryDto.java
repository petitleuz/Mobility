package com.mobility.delivery.dto;

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
public class DeliveryDto {
    
    private Long id;
    private String trackingNumber;
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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime pickupTime;
    private LocalDateTime deliveryTime;
    private String notes;
} 