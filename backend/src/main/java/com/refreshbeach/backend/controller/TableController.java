package com.refreshbeach.backend.controller;

import com.refreshbeach.backend.dto.TableDto;
import com.refreshbeach.backend.model.RestaurantTable;
import com.refreshbeach.backend.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tables")
public class TableController {
    
    private final TableService tableService;
    
    @Autowired
    public TableController(TableService tableService) {
        this.tableService = tableService;
    }
    
    @GetMapping
    public ResponseEntity<List<TableDto>> getAllTables() {
        List<RestaurantTable> tables = tableService.getAllTables();
        List<TableDto> tableDtos = tables.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
        return ResponseEntity.ok(tableDtos);
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<TableDto>> getAvailableTables(
            @RequestParam LocalDate date,
            @RequestParam LocalTime time) {
        List<RestaurantTable> tables = tableService.getAvailableTables(date, time);
        List<TableDto> tableDtos = tables.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
        return ResponseEntity.ok(tableDtos);
    }
    
    private TableDto convertToDto(RestaurantTable table) {
        TableDto dto = new TableDto();
        dto.setTableId(table.getTableId());
        dto.setTableNumber(table.getTableNumber());
        dto.setCapacity(table.getCapacity());
        dto.setLocation(table.getLocation().toString());
        dto.setStatus(table.getStatus().toString());
        return dto;
    }
} 