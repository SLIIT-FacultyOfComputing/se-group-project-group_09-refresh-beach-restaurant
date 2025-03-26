package com.refreshbeach.backend.repository;

import com.refreshbeach.backend.model.RestaurantTable;
import com.refreshbeach.backend.model.TableStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TableRepository extends JpaRepository<RestaurantTable, Integer> {
    List<RestaurantTable> findByStatus(TableStatus status);
    
    @Query("SELECT t FROM RestaurantTable t WHERE t.tableId NOT IN " +
           "(SELECT r.table.tableId FROM Reservation r WHERE r.reservationDate = :date " +
           "AND r.reservationTime = :time AND r.status = 'UPCOMING')")
    List<RestaurantTable> findAvailableTablesAtDateTime(@Param("date") LocalDate date, 
                                                        @Param("time") LocalTime time);
} 