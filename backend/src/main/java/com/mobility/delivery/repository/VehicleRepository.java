package com.mobility.delivery.repository;

import com.mobility.delivery.entity.Vehicle;
import com.mobility.delivery.entity.VehicleStatus;
import com.mobility.delivery.entity.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    
    Optional<Vehicle> findByVehicleId(String vehicleId);
    
    Optional<Vehicle> findByLicensePlate(String licensePlate);
    
    List<Vehicle> findByStatus(VehicleStatus status);
    
    List<Vehicle> findByType(VehicleType type);
    
    List<Vehicle> findByDriverId(String driverId);
    
    @Query("SELECT v FROM Vehicle v WHERE v.status = 'AVAILABLE'")
    List<Vehicle> findAvailableVehicles();
    
    @Query("SELECT v FROM Vehicle v WHERE v.status = 'AVAILABLE' AND v.type = :type")
    List<Vehicle> findAvailableVehiclesByType(@Param("type") VehicleType type);
} 