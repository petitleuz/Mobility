package com.mobility.delivery.entity;

public enum VehicleType {
    MOTORCYCLE("Moto"),
    CAR("Voiture"),
    VAN("Fourgon"),
    TRUCK("Camion"),
    BICYCLE("Vélo");
    
    private final String description;
    
    VehicleType(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
} 