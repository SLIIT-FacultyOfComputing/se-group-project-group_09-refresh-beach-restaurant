package grp_9.restaurant2.Controller;

import grp_9.restaurant2.entity.ReservationRating;
import grp_9.restaurant2.service.ReservationRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservation-ratings")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:8579", "http://localhost:8931"})
public class ReservationRatingController {

    private final ReservationRatingService ratingService;

    @Autowired
    public ReservationRatingController(ReservationRatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping(value = "/rate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> rateReservation(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extract parameters from payload
            if (!payload.containsKey("reservationId") || !payload.containsKey("rating")) {
                response.put("error", "Missing required fields");
                return ResponseEntity.badRequest().body(response);
            }
            
            Long reservationId = Long.valueOf(payload.get("reservationId").toString());
            Integer rating = Integer.valueOf(payload.get("rating").toString());
            
            // Extract optional reviewText
            String reviewText = payload.containsKey("reviewText") ? payload.get("reviewText").toString() : null;
            
            // Rate the reservation
            ReservationRating savedRating = ratingService.rateReservation(reservationId, rating, reviewText);
            
            response.put("success", true);
            response.put("message", "Reservation rated successfully");
            response.put("ratingId", savedRating.getId());
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("error", "Invalid rating request");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("error", "Failed to rate reservation");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping(value = "/{reservationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRating(@PathVariable Long reservationId) {
        try {
            Optional<ReservationRating> rating = ratingService.getRatingForReservation(reservationId);
            
            if (rating.isPresent()) {
                return ResponseEntity.ok(rating.get());
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "No rating found for this reservation");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch rating");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping(value = "/check/{reservationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> checkIfRated(@PathVariable Long reservationId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean isRated = ratingService.isReservationRated(reservationId);
            
            response.put("isRated", isRated);
            
            if (isRated) {
                Optional<ReservationRating> rating = ratingService.getRatingForReservation(reservationId);
                if (rating.isPresent()) {
                    response.put("rating", rating.get().getRating());
                }
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Failed to check rating status");
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
} 