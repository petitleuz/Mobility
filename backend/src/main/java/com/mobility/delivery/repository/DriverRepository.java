package com.mobility.delivery.repository;

import com.mobility.delivery.entity.Driver;
import com.mobility.delivery.entity.DriverStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    
    Optional<Driver> findByDriverId(String driverId);
    
    Optional<Driver> findByPhoneNumber(String phoneNumber);
    
    Optional<Driver> findByEmail(String email);
    
    List<Driver> findByStatus(DriverStatus status);
    
    @Query("SELECT d FROM Driver d WHERE d.status = 'AVAILABLE'")
    List<Driver> findAvailableDrivers();
    
    @Query("SELECT d FROM Driver d WHERE d.currentLocation LIKE %:location%")
    List<Driver> findByLocationContaining(@Param("location") String location);
} 