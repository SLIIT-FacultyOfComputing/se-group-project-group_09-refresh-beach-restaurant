package com.refreshbeach.backend.controller;

import com.refreshbeach.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservations")
public class ReservationControllerSimple {
    
    private final ReservationService reservationService;
    
    @Autowired
    public ReservationControllerSimple(ReservationService reservationService) {
        this.reservationService = reservationService;
    }
} 