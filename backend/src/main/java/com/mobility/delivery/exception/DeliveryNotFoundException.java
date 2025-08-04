package com.mobility.delivery.exception;

public class DeliveryNotFoundException extends RuntimeException {
    
    public DeliveryNotFoundException(String message) {
        super(message);
    }
    
    public DeliveryNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
} 