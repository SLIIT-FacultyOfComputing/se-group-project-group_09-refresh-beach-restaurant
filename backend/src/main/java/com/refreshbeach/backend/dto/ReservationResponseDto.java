package com.refreshbeach.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDto {
    private Integer reservationId;
    private String customerName;
    private Integer tableNumber;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private String status;
    private String message;
    
    // Constructor for error responses
    public ReservationResponseDto(Integer reservationId, String message) {
        this.reservationId = reservationId;
        this.message = message;
    }
} 