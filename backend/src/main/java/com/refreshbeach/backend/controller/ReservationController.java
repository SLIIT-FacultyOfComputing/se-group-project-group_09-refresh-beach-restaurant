package com.refreshbeach.backend.controller;

import com.refreshbeach.backend.dto.ReservationDto;
import com.refreshbeach.backend.dto.ReservationResponseDto;
import com.refreshbeach.backend.exception.ReservationNotFoundException;
import com.refreshbeach.backend.exception.TableAlreadyReservedException;
import com.refreshbeach.backend.exception.TableNotFoundException;
import com.refreshbeach.backend.exception.UserNotFoundException;
import com.refreshbeach.backend.model.Reservation;
import com.refreshbeach.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    
    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);
    private final ReservationService reservationService;
    
    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }
    
    @PostMapping("/reserve")
    public ResponseEntity<ReservationResponseDto> createReservation(@RequestBody ReservationDto reservationDto) {
        try {
            Reservation reservation = reservationService.createReservation(reservationDto);
            ReservationResponseDto responseDto = convertToDto(reservation);
            responseDto.setMessage("Reservation created successfully!");
            return ResponseEntity.ok(responseDto);
        } catch (TableAlreadyReservedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ReservationResponseDto(null, e.getMessage()));
        } catch (TableNotFoundException | UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ReservationResponseDto(null, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ReservationResponseDto(null, "Failed to create reservation: " + e.getMessage()));
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationResponseDto>> getUserReservations(@PathVariable Long userId) {
        try {
            logger.info("Fetching reservations for user ID: {}", userId);
            List<Reservation> reservations = reservationService.getUserReservations(userId);
            logger.info("Found {} reservations for user ID: {}", reservations.size(), userId);
            List<ReservationResponseDto> responseDtos = reservations.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
            return ResponseEntity.ok(responseDtos);
        } catch (UserNotFoundException e) {
            logger.error("User not found with ID: {}", userId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            logger.error("Error fetching reservations for user ID: " + userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(List.of(new ReservationResponseDto(null, "Error fetching reservations: " + e.getMessage())));
        }
    }
    
    @PutMapping("/{reservationId}/cancel")
    public ResponseEntity<ReservationResponseDto> cancelReservation(@PathVariable Integer reservationId) {
        try {
            Reservation reservation = reservationService.cancelReservation(reservationId);
            ReservationResponseDto responseDto = convertToDto(reservation);
            responseDto.setMessage("Reservation cancelled successfully!");
            return ResponseEntity.ok(responseDto);
        } catch (ReservationNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ReservationResponseDto(null, e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<List<ReservationResponseDto>> getAllReservations() {
        try {
            logger.info("Fetching all reservations");
            List<Reservation> reservations = reservationService.getAllReservations();
            logger.info("Found {} reservations", reservations.size());
            List<ReservationResponseDto> responseDtos = reservations.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
            return ResponseEntity.ok(responseDtos);
        } catch (Exception e) {
            logger.error("Error fetching all reservations: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(List.of(new ReservationResponseDto(null, "Error fetching reservations: " + e.getMessage())));
        }
    }
    
    private ReservationResponseDto convertToDto(Reservation reservation) {
        try {
            if (reservation == null) {
                logger.error("Cannot convert null reservation to DTO");
                throw new IllegalArgumentException("Reservation cannot be null");
            }
            
            logger.info("Converting reservation {} to DTO", reservation.getReservationId());
            ReservationResponseDto dto = new ReservationResponseDto();
            dto.setReservationId(reservation.getReservationId());
            
            if (reservation.getCustomer() != null) {
                dto.setCustomerName(reservation.getCustomer().getFullName());
            } else {
                logger.warn("Customer is null for reservation {}", reservation.getReservationId());
                dto.setCustomerName("Unknown");
            }
            
            if (reservation.getTable() != null) {
                dto.setTableNumber(reservation.getTable().getTableNumber());
            } else {
                logger.warn("Table is null for reservation {}", reservation.getReservationId());
                dto.setTableNumber(null);
            }
            
            dto.setReservationDate(reservation.getReservationDate());
            dto.setReservationTime(reservation.getReservationTime());
            dto.setStatus(reservation.getStatus() != null ? reservation.getStatus().toString() : "Unknown");
            
            logger.info("Successfully converted reservation {} to DTO", reservation.getReservationId());
            return dto;
        } catch (Exception e) {
            logger.error("Error converting reservation to DTO: {}", e.getMessage(), e);
            throw new RuntimeException("Error converting reservation to DTO: " + e.getMessage(), e);
        }
    }
} 