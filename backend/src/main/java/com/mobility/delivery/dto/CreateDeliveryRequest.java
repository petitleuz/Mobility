package com.mobility.delivery.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateDeliveryRequest {
    
    @NotBlank(message = "Le nom du client est requis")
    private String customerName;
    
    @NotBlank(message = "Le téléphone du client est requis")
    private String customerPhone;
    
    @NotBlank(message = "L'adresse de ramassage est requise")
    private String pickupAddress;
    
    @NotBlank(message = "L'adresse de livraison est requise")
    private String deliveryAddress;
    
    @NotBlank(message = "La ville de ramassage est requise")
    private String pickupCity;
    
    @NotBlank(message = "La ville de livraison est requise")
    private String deliveryCity;
    
    @NotNull(message = "Le poids est requis")
    @Positive(message = "Le poids doit être positif")
    private BigDecimal weight;
    
    @NotNull(message = "Le prix est requis")
    @Positive(message = "Le prix doit être positif")
    private BigDecimal price;
    
    private String notes;
} 