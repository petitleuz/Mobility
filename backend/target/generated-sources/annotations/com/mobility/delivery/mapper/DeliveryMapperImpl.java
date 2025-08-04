package com.mobility.delivery.mapper;

import com.mobility.delivery.dto.DeliveryDto;
import com.mobility.delivery.entity.Delivery;
import com.mobility.delivery.entity.DeliveryStatus;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-08-04T09:06:28+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.50.v20250729-0351, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class DeliveryMapperImpl implements DeliveryMapper {

    @Override
    public DeliveryDto toDto(Delivery delivery) {
        if ( delivery == null ) {
            return null;
        }

        DeliveryDto.DeliveryDtoBuilder deliveryDto = DeliveryDto.builder();

        deliveryDto.id( delivery.getId() );
        deliveryDto.createdAt( delivery.getCreatedAt() );
        deliveryDto.customerName( delivery.getCustomerName() );
        deliveryDto.customerPhone( delivery.getCustomerPhone() );
        deliveryDto.deliveryAddress( delivery.getDeliveryAddress() );
        deliveryDto.deliveryCity( delivery.getDeliveryCity() );
        deliveryDto.deliveryTime( delivery.getDeliveryTime() );
        deliveryDto.driverId( delivery.getDriverId() );
        deliveryDto.notes( delivery.getNotes() );
        deliveryDto.pickupAddress( delivery.getPickupAddress() );
        deliveryDto.pickupCity( delivery.getPickupCity() );
        deliveryDto.pickupTime( delivery.getPickupTime() );
        deliveryDto.price( delivery.getPrice() );
        deliveryDto.status( delivery.getStatus() );
        deliveryDto.trackingNumber( delivery.getTrackingNumber() );
        deliveryDto.updatedAt( delivery.getUpdatedAt() );
        deliveryDto.vehicleId( delivery.getVehicleId() );
        deliveryDto.weight( delivery.getWeight() );

        return deliveryDto.build();
    }

    @Override
    public Delivery toEntity(DeliveryDto deliveryDto) {
        if ( deliveryDto == null ) {
            return null;
        }

        Delivery.DeliveryBuilder delivery = Delivery.builder();

        delivery.customerName( deliveryDto.getCustomerName() );
        delivery.customerPhone( deliveryDto.getCustomerPhone() );
        delivery.deliveryAddress( deliveryDto.getDeliveryAddress() );
        delivery.deliveryCity( deliveryDto.getDeliveryCity() );
        delivery.notes( deliveryDto.getNotes() );
        delivery.pickupAddress( deliveryDto.getPickupAddress() );
        delivery.pickupCity( deliveryDto.getPickupCity() );
        delivery.price( deliveryDto.getPrice() );
        delivery.weight( deliveryDto.getWeight() );

        delivery.status( DeliveryStatus.PENDING );

        return delivery.build();
    }

    @Override
    public List<DeliveryDto> toDtoList(List<Delivery> deliveries) {
        if ( deliveries == null ) {
            return null;
        }

        List<DeliveryDto> list = new ArrayList<DeliveryDto>( deliveries.size() );
        for ( Delivery delivery : deliveries ) {
            list.add( toDto( delivery ) );
        }

        return list;
    }

    @Override
    public List<Delivery> toEntityList(List<DeliveryDto> deliveryDtos) {
        if ( deliveryDtos == null ) {
            return null;
        }

        List<Delivery> list = new ArrayList<Delivery>( deliveryDtos.size() );
        for ( DeliveryDto deliveryDto : deliveryDtos ) {
            list.add( toEntity( deliveryDto ) );
        }

        return list;
    }
}
