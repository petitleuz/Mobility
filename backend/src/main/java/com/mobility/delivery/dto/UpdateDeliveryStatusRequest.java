package com.mobility.delivery.dto;

import com.mobility.delivery.entity.DeliveryStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateDeliveryStatusRequest {
    
    @NotNull(message = "Le statut est requis")
    private DeliveryStatus status;
    
    private String notes;
} 