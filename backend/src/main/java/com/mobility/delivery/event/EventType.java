package com.mobility.delivery.event;

public enum EventType {
    DELIVERY_CREATED("delivery-created"),
    DELIVERY_ASSIGNED("delivery-assigned"),
    DELIVERY_STATUS_UPDATED("delivery-status-updated"),
    DELIVERY_PICKED_UP("delivery-picked-up"),
    DELIVERY_IN_TRANSIT("delivery-in-transit"),
    DELIVERY_OUT_FOR_DELIVERY("delivery-out-for-delivery"),
    DELIVERY_DELIVERED("delivery-delivered"),
    DELIVERY_FAILED("delivery-failed"),
    DELIVERY_CANCELLED("delivery-cancelled"),
    DRIVER_LOCATION_UPDATED("driver-location-updated"),
    VEHICLE_STATUS_UPDATED("vehicle-status-updated");
    
    private final String value;
    
    EventType(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
    }
} 