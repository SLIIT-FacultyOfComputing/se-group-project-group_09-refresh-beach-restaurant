package com.refreshbeach.backend.service;

import com.refreshbeach.backend.model.RestaurantTable;
import com.refreshbeach.backend.model.TableStatus;
import com.refreshbeach.backend.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TableService {
    
    private final TableRepository tableRepository;
    
    @Autowired
    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }
    
    public List<RestaurantTable> getAllTables() {
        return tableRepository.findAll();
    }
    
    public List<RestaurantTable> getAvailableTables(LocalDate date, LocalTime time) {
        return tableRepository.findAvailableTablesAtDateTime(date, time);
    }
    
    public List<RestaurantTable> getTablesByStatus(TableStatus status) {
        return tableRepository.findByStatus(status);
    }
    
    public Optional<RestaurantTable> getTableById(Integer tableId) {
        return tableRepository.findById(tableId);
    }
} 