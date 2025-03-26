package com.refreshbeach.backend.repository;

import com.refreshbeach.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByCustomerId(Long customerId);
    
    List<Reservation> findByReservationDateAndReservationTime(LocalDate date, LocalTime time);
    
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Reservation r " +
           "WHERE r.table.tableId = :tableId AND r.reservationDate = :date " +
           "AND r.reservationTime = :time AND r.status = 'UPCOMING'")
    boolean isTableReserved(@Param("tableId") Integer tableId, 
                           @Param("date") LocalDate date, 
                           @Param("time") LocalTime time);
} 