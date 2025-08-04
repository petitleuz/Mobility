package com.mobility.delivery.entity;

public enum DeliveryStatus {
    PENDING("En attente"),
    ASSIGNED("Assigné"),
    PICKUP_IN_PROGRESS("En cours de ramassage"),
    PICKED_UP("Ramassé"),
    IN_TRANSIT("En transit"),
    OUT_FOR_DELIVERY("En livraison"),
    DELIVERED("Livré"),
    FAILED("Échec"),
    CANCELLED("Annulé");
    
    private final String description;
    
    DeliveryStatus(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
} 