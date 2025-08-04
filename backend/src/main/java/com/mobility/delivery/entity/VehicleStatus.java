package com.mobility.delivery.entity;

public enum VehicleStatus {
    AVAILABLE("Disponible"),
    IN_USE("En utilisation"),
    MAINTENANCE("En maintenance"),
    OUT_OF_SERVICE("Hors service");
    
    private final String description;
    
    VehicleStatus(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
} 