package grp_9.restaurant2.Controller;

import grp_9.restaurant2.entity.RestaurantTable;
import grp_9.restaurant2.entity.TableStatus;
import grp_9.restaurant2.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:8579", "http://localhost:8931"})
public class TableController {
    private static final Logger logger = Logger.getLogger(TableController.class.getName());

    @Autowired
    private TableRepository tableRepository;
    
    // Initialize tables when application starts
    @PostConstruct
    @Transactional
    public void initializeTables() {
        long tableCount = tableRepository.count();
        logger.info("Current number of tables in database: " + tableCount);
        
        if (tableCount < 35) {
            logger.info("Adding more tables to reach at least 35");
            int tablesToAdd = (int)(35 - tableCount);
            
            for (int i = 1; i <= tablesToAdd; i++) {
                RestaurantTable table = new RestaurantTable();
                table.setTableNumber(i);
                table.setCapacity(4);
                table.setLocation(i % 3 == 0 ? "window" : i % 3 == 1 ? "center" : "corner");
                table.setStatus(TableStatus.AVAILABLE);
                tableRepository.save(table);
            }
            logger.info("Added " + tablesToAdd + " more tables to the database");
        } else {
            logger.info("Sufficient tables exist in database, count: " + tableCount);
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<RestaurantTable> getAllTables() {
        logger.info("Getting all tables");
        return tableRepository.findAll();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public RestaurantTable getTableById(@PathVariable Long id) {
        logger.info("Getting table by id: " + id);
        return tableRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Table not found with id: " + id));
    }

    @GetMapping(value = "/available", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<RestaurantTable> getAvailableTables(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String time) {
        
        logger.info("Getting available tables for date: " + date + " and time: " + time);
        
        // When parameters are missing, return all tables
        if (date == null || time == null) {
            logger.info("Date or time is null, returning all tables");
            return tableRepository.findAll();
        }
        
        try {
            LocalTime localTime = LocalTime.parse(time);
            List<RestaurantTable> availableTables = tableRepository.findAvailableTables(date, localTime);
            logger.info("Found " + availableTables.size() + " available tables");
            return availableTables;
        } catch (Exception e) {
            logger.warning("Error finding available tables: " + e.getMessage());
            // Fallback to returning all tables if there's an error
            List<RestaurantTable> allTables = tableRepository.findAll();
            logger.info("Returning " + allTables.size() + " tables as fallback");
            return allTables;
        }
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public RestaurantTable createTable(@RequestBody RestaurantTable table) {
        logger.info("Creating new table with capacity: " + table.getCapacity());
        return tableRepository.save(table);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public RestaurantTable updateTable(@PathVariable Long id, @RequestBody RestaurantTable tableDetails) {
        logger.info("Updating table with id: " + id);
        RestaurantTable table = tableRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Table not found with id: " + id));
        
        table.setTableNumber(tableDetails.getTableNumber());
        table.setCapacity(tableDetails.getCapacity());
        table.setLocation(tableDetails.getLocation());
        table.setStatus(tableDetails.getStatus());
        
        return tableRepository.save(table);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public void deleteTable(@PathVariable Long id) {
        logger.info("Deleting table with id: " + id);
        tableRepository.deleteById(id);
    }
} 