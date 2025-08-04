package com.mobility.delivery.repository;

import com.mobility.delivery.entity.Delivery;
import com.mobility.delivery.entity.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    
    Optional<Delivery> findByTrackingNumber(String trackingNumber);
    
    List<Delivery> findByStatus(DeliveryStatus status);
    
    List<Delivery> findByDriverId(String driverId);
    
    List<Delivery> findByCustomerPhone(String customerPhone);
    
    @Query("SELECT d FROM Delivery d WHERE d.createdAt BETWEEN :startDate AND :endDate")
    List<Delivery> findByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                         @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT d FROM Delivery d WHERE d.pickupCity = :city OR d.deliveryCity = :city")
    List<Delivery> findByCity(@Param("city") String city);
    
    @Query("SELECT COUNT(d) FROM Delivery d WHERE d.status = :status")
    long countByStatus(@Param("status") DeliveryStatus status);
    
    @Query("SELECT d FROM Delivery d WHERE d.status IN :statuses ORDER BY d.createdAt DESC")
    List<Delivery> findByStatusIn(@Param("statuses") List<DeliveryStatus> statuses);
} 