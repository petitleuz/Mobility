package com.mobility.delivery.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mobility.delivery.event.DeliveryEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {
    
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    
    public CompletableFuture<SendResult<String, String>> sendDeliveryEvent(String topic, DeliveryEvent event) {
        try {
            String eventJson = objectMapper.writeValueAsString(event);
            log.info("Sending event to topic {}: {}", topic, eventJson);
            
            return kafkaTemplate.send(topic, event.getTrackingNumber(), eventJson)
                    .whenComplete((result, throwable) -> {
                        if (throwable == null) {
                            log.info("Event sent successfully to topic {}: {}", topic, event.getEventId());
                        } else {
                            log.error("Failed to send event to topic {}: {}", topic, throwable.getMessage());
                        }
                    });
        } catch (JsonProcessingException e) {
            log.error("Error serializing event: {}", e.getMessage());
            CompletableFuture<SendResult<String, String>> future = new CompletableFuture<>();
            future.completeExceptionally(e);
            return future;
        }
    }
    
    public void sendDeliveryEventSync(String topic, DeliveryEvent event) {
        try {
            String eventJson = objectMapper.writeValueAsString(event);
            log.info("Sending event to topic {}: {}", topic, eventJson);
            
            kafkaTemplate.send(topic, event.getTrackingNumber(), eventJson);
        } catch (JsonProcessingException e) {
            log.error("Error serializing event: {}", e.getMessage());
            throw new RuntimeException("Error serializing event", e);
        }
    }
} 