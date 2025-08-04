package com.mobility.delivery.entity;

public enum DriverStatus {
    AVAILABLE("Disponible"),
    BUSY("Occupé"),
    OFFLINE("Hors ligne"),
    ON_DELIVERY("En livraison"),
    ON_BREAK("En pause");
    
    private final String description;
    
    DriverStatus(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
} 