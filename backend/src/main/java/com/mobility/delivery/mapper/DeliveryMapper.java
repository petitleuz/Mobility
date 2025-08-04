package com.mobility.delivery.mapper;

import com.mobility.delivery.dto.DeliveryDto;
import com.mobility.delivery.entity.Delivery;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeliveryMapper {
    
    DeliveryMapper INSTANCE = Mappers.getMapper(DeliveryMapper.class);
    
    @Mapping(target = "id", source = "id")
    DeliveryDto toDto(Delivery delivery);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "trackingNumber", ignore = true)
    @Mapping(target = "status", constant = "PENDING")
    @Mapping(target = "driverId", ignore = true)
    @Mapping(target = "vehicleId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "pickupTime", ignore = true)
    @Mapping(target = "deliveryTime", ignore = true)
    Delivery toEntity(DeliveryDto deliveryDto);
    
    List<DeliveryDto> toDtoList(List<Delivery> deliveries);
    
    List<Delivery> toEntityList(List<DeliveryDto> deliveryDtos);
} 