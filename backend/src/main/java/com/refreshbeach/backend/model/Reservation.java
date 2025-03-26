package com.refreshbeach.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Integer reservationId;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    
    @ManyToOne
    @JoinColumn(name = "table_id")
    private RestaurantTable table;
    
    @Column(name = "reservation_date")
    private LocalDate reservationDate;
    
    @Column(name = "reservation_time")
    private LocalTime reservationTime;
    
    @Enumerated(EnumType.STRING)
    private ReservationStatus status;
    
    @Column(name = "created_at")
    private Timestamp createdAt;
} 