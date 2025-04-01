package grp_9.restaurant2.repository;

import grp_9.restaurant2.entity.ReservationStatus;
import grp_9.restaurant2.entity.RestaurantTable;
import grp_9.restaurant2.entity.TableStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TableRepository extends JpaRepository<RestaurantTable, Long> {
    
    // Find tables that are available
    List<RestaurantTable> findByStatus(TableStatus status);
    
    // Find available tables (not reserved)
    default List<RestaurantTable> findAvailableTables() {
        return findByStatus(TableStatus.AVAILABLE);
    }
    
    // Custom query to find tables that don't have a reservation for the specified date and time
    // Using UPPER() to make case-insensitive comparison
    @Query("SELECT t FROM RestaurantTable t WHERE t.id NOT IN " +
           "(SELECT CAST(r.tableId AS long) FROM Reservation r " +
           "WHERE r.reservationDate = :date AND r.reservationTime = :time " +
           "AND (UPPER(r.status) = 'UPCOMING' OR r.status = grp_9.restaurant2.entity.ReservationStatus.UPCOMING))")
    List<RestaurantTable> findAvailableTables(@Param("date") LocalDate date, @Param("time") LocalTime time);
} 