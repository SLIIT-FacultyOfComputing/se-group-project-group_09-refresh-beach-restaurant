package grp_9.restaurant2.Controller;

import grp_9.restaurant2.entity.Reservation;
import grp_9.restaurant2.service.ReservationService;
import grp_9.restaurant2.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:8579", "http://localhost:8931"})
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ReminderService reminderService;

    @PostConstruct
    public void initializeAndFixData() {
        // Fix case sensitivity issues in status field
        try {
            jdbcTemplate.update("UPDATE reservations SET status = 'UPCOMING' WHERE status = 'Upcoming'");
            System.out.println("Fixed case sensitivity in reservations status field");
        } catch (Exception e) {
            System.err.println("Error fixing reservation status case: " + e.getMessage());
        }
    }

    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> addReservation(@RequestBody Reservation reservation) {
        try {
            Reservation saved = reservationService.saveReservation(reservation);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Reservation successful");
            response.put("reservationId", saved.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to create reservation");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    @PostMapping(value = "/reserve", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> createReservation(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Debug payload
            System.out.println("Received reservation payload: " + payload);
            
            // Extract and validate request parameters
            if (!payload.containsKey("customerId") || !payload.containsKey("tableId") || 
                !payload.containsKey("reservationDate") || !payload.containsKey("reservationTime")) {
                response.put("error", "Missing required fields");
                System.out.println("Missing required fields in payload");
                return ResponseEntity.badRequest().body(response);
            }
            
            Long customerId = Long.valueOf(payload.get("customerId").toString());
            Long tableId = Long.valueOf(payload.get("tableId").toString());
            String dateStr = payload.get("reservationDate").toString();
            String timeStr = payload.get("reservationTime").toString();
            
            // Get optional fields with defaults
            int peopleCount = payload.containsKey("peopleCount") ? 
                              Integer.parseInt(payload.get("peopleCount").toString()) : 4;
            String contactNumber = payload.containsKey("contactNumber") ? 
                                  payload.get("contactNumber").toString() : "555-123-4567";
            String customerEmail = payload.containsKey("customerEmail") ?
                                  payload.get("customerEmail").toString() : "";
            
            System.out.println("Processing reservation - tableId: " + tableId + ", customerId: " + customerId 
                        + ", date: " + dateStr + ", time: " + timeStr);
            
            LocalDate date;
            LocalTime time;
            
            try {
                date = LocalDate.parse(dateStr);
                time = LocalTime.parse(timeStr);
            } catch (DateTimeParseException e) {
                System.out.println("Date/time parse error: " + e.getMessage());
                response.put("error", "Invalid date or time format");
                response.put("message", e.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
            
            // Call service to create reservation
            Reservation savedReservation = reservationService.createReservation(
                customerId, tableId, date, time, peopleCount, contactNumber, customerEmail);
            
            System.out.println("Saved reservation with ID: " + savedReservation.getId());
            
            response.put("success", true);
            response.put("message", "Reservation successful");
            response.put("reservationId", savedReservation.getId());
            return ResponseEntity.ok(response);
            
        } catch (NumberFormatException e) {
            response.put("error", "Invalid customer ID or table ID");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (RuntimeException e) {
            response.put("error", "Failed to create reservation");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("error", "Failed to create reservation");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Reservation>> getAllReservations() {
        try {
            return ResponseEntity.ok(reservationService.getAllReservations());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserReservations(@PathVariable Long userId) {
        try {
            List<Reservation> userReservations = reservationService.getReservationsByCustomerId(userId);
            return ResponseEntity.ok(userReservations);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch user reservations");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PutMapping(value = "/{id}/cancel", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> cancelReservation(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean success = reservationService.cancelReservation(id);
            
            if (!success) {
                response.put("error", "Reservation not found");
                return ResponseEntity.badRequest().body(response);
            }
            
            response.put("success", true);
            response.put("message", "Reservation cancelled successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Failed to cancel reservation");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/test-email-reminder", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> testEmailReminder(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Check if a specific reservation ID was provided
            if (payload.containsKey("reservationId")) {
                Long reservationId = Long.valueOf(payload.get("reservationId").toString());
                reminderService.sendReminderForReservation(reservationId);
                response.put("success", true);
                response.put("message", "Test email reminder sent for reservation ID: " + reservationId);
            } else {
                // Otherwise, run the full reminder process
                reminderService.sendReservationReminders();
                response.put("success", true);
                response.put("message", "Test email reminders sent for all tomorrow's reservations");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Failed to send test email reminder");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}