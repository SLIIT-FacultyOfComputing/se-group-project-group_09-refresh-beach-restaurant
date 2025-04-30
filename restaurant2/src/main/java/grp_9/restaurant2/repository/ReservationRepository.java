package grp_9.restaurant2.repository;

import grp_9.restaurant2.entity.Reservation;
import grp_9.restaurant2.entity.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCustomerId(Long customerId);
    
    // Find reservations for a specific table on a specific date and time with a specific status
    List<Reservation> findByTableIdAndReservationDateAndReservationTimeAndStatus(
        Integer tableId, LocalDate reservationDate, LocalTime reservationTime, ReservationStatus status);
    
    // Case-insensitive query to find upcoming reservations for a specific table, date and time
    @Query("SELECT r FROM Reservation r WHERE r.tableId = :tableId " +
           "AND r.reservationDate = :date AND r.reservationTime = :time " +
           "AND (UPPER(r.status) = 'UPCOMING' OR r.status = grp_9.restaurant2.entity.ReservationStatus.UPCOMING)")
    List<Reservation> findUpcomingReservations(
        @Param("tableId") Integer tableId, 
        @Param("date") LocalDate date, 
        @Param("time") LocalTime time);
        
    // Find all UPCOMING reservations that are in the past (based on date and time)
    @Query("SELECT r FROM Reservation r WHERE " +
           "(r.status = grp_9.restaurant2.entity.ReservationStatus.UPCOMING) AND " +
           "((r.reservationDate < :currentDate) OR " +
           "(r.reservationDate = :currentDate AND r.reservationTime < :currentTime))")
    List<Reservation> findPastUpcomingReservations(
        @Param("currentDate") LocalDate currentDate,
        @Param("currentTime") LocalTime currentTime);
}
