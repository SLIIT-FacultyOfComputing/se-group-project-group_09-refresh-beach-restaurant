package grp_9.restaurant2.repository;

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
    
    // Custom query to find available tables for a specific date and time
    @Query("SELECT t FROM RestaurantTable t LEFT JOIN Reservation r ON t.id = r.tableId " +
           "WHERE t.status = grp_9.restaurant2.entity.TableStatus.AVAILABLE OR r.id IS NULL OR " +
           "(r.reservationDate != :date OR r.reservationTime != :time)")
    List<RestaurantTable> findAvailableTables(@Param("date") LocalDate date, @Param("time") LocalTime time);
} 