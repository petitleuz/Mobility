package com.mobility.delivery.service;

import com.mobility.delivery.dto.CreateDeliveryRequest;
import com.mobility.delivery.dto.DeliveryDto;
import com.mobility.delivery.entity.Delivery;
import com.mobility.delivery.entity.DeliveryStatus;
import com.mobility.delivery.kafka.KafkaProducerService;
import com.mobility.delivery.mapper.DeliveryMapper;
import com.mobility.delivery.repository.DeliveryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeliveryServiceTest {
    
    @Mock
    private DeliveryRepository deliveryRepository;
    
    @Mock
    private DeliveryMapper deliveryMapper;
    
    @Mock
    private KafkaProducerService kafkaProducerService;
    
    @InjectMocks
    private DeliveryService deliveryService;
    
    private CreateDeliveryRequest createDeliveryRequest;
    private Delivery delivery;
    private DeliveryDto deliveryDto;
    
    @BeforeEach
    void setUp() {
        createDeliveryRequest = CreateDeliveryRequest.builder()
                .customerName("John Doe")
                .customerPhone("+221701234567")
                .pickupAddress("123 Rue de la Paix, Dakar")
                .deliveryAddress("456 Avenue Léopold Sédar Senghor, Dakar")
                .pickupCity("Dakar")
                .deliveryCity("Dakar")
                .weight(new BigDecimal("5.5"))
                .price(new BigDecimal("2500"))
                .notes("Livraison urgente")
                .build();
        
        delivery = Delivery.builder()
                .id(1L)
                .trackingNumber("DEL123456789")
                .customerName("John Doe")
                .customerPhone("+221701234567")
                .pickupAddress("123 Rue de la Paix, Dakar")
                .deliveryAddress("456 Avenue Léopold Sédar Senghor, Dakar")
                .pickupCity("Dakar")
                .deliveryCity("Dakar")
                .weight(new BigDecimal("5.5"))
                .price(new BigDecimal("2500"))
                .status(DeliveryStatus.PENDING)
                .driverId("")
                .vehicleId("")
                .notes("Livraison urgente")
                .build();
        
        deliveryDto = DeliveryDto.builder()
                .id(1L)
                .trackingNumber("DEL123456789")
                .customerName("John Doe")
                .customerPhone("+221701234567")
                .pickupAddress("123 Rue de la Paix, Dakar")
                .deliveryAddress("456 Avenue Léopold Sédar Senghor, Dakar")
                .pickupCity("Dakar")
                .deliveryCity("Dakar")
                .weight(new BigDecimal("5.5"))
                .price(new BigDecimal("2500"))
                .status(DeliveryStatus.PENDING)
                .driverId("")
                .vehicleId("")
                .notes("Livraison urgente")
                .build();
    }
    
    @Test
    void createDelivery_ShouldReturnDeliveryDto() {
        // Given
        when(deliveryRepository.save(any(Delivery.class))).thenReturn(delivery);
        when(deliveryMapper.toDto(delivery)).thenReturn(deliveryDto);
        
        // When
        DeliveryDto result = deliveryService.createDelivery(createDeliveryRequest);
        
        // Then
        assertNotNull(result);
        assertEquals("John Doe", result.getCustomerName());
        assertEquals("+221701234567", result.getCustomerPhone());
        assertEquals(DeliveryStatus.PENDING, result.getStatus());
        assertNotNull(result.getTrackingNumber());
        
        verify(deliveryRepository).save(any(Delivery.class));
        verify(deliveryMapper).toDto(delivery);
        verify(kafkaProducerService).sendDeliveryEvent(eq("delivery-events"), any());
    }
    
    @Test
    void getDeliveryByTrackingNumber_ShouldReturnDeliveryDto() {
        // Given
        String trackingNumber = "DEL123456789";
        when(deliveryRepository.findByTrackingNumber(trackingNumber)).thenReturn(Optional.of(delivery));
        when(deliveryMapper.toDto(delivery)).thenReturn(deliveryDto);
        
        // When
        DeliveryDto result = deliveryService.getDeliveryByTrackingNumber(trackingNumber);
        
        // Then
        assertNotNull(result);
        assertEquals(trackingNumber, result.getTrackingNumber());
        
        verify(deliveryRepository).findByTrackingNumber(trackingNumber);
        verify(deliveryMapper).toDto(delivery);
    }
    
    @Test
    void getAllDeliveries_ShouldReturnListOfDeliveryDto() {
        // Given
        List<Delivery> deliveries = Arrays.asList(delivery);
        List<DeliveryDto> deliveryDtos = Arrays.asList(deliveryDto);
        
        when(deliveryRepository.findAll()).thenReturn(deliveries);
        when(deliveryMapper.toDtoList(deliveries)).thenReturn(deliveryDtos);
        
        // When
        List<DeliveryDto> result = deliveryService.getAllDeliveries();
        
        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getCustomerName());
        
        verify(deliveryRepository).findAll();
        verify(deliveryMapper).toDtoList(deliveries);
    }
} 