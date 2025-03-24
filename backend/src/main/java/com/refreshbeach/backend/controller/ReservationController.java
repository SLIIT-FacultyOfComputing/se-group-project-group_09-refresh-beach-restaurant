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

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    
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
        List<Reservation> reservations = reservationService.getUserReservations(userId);
        List<ReservationResponseDto> responseDtos = reservations.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
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
    
    private ReservationResponseDto convertToDto(Reservation reservation) {
        ReservationResponseDto dto = new ReservationResponseDto();
        dto.setReservationId(reservation.getReservationId());
        dto.setCustomerName(reservation.getCustomer().getFullName());
        dto.setTableNumber(reservation.getTable().getTableNumber());
        dto.setReservationDate(reservation.getReservationDate());
        dto.setReservationTime(reservation.getReservationTime());
        dto.setStatus(reservation.getStatus().toString());
        return dto;
    }
} 