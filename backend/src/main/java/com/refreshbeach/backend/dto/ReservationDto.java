package com.refreshbeach.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private Long customerId;
    private Integer tableId;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
} 