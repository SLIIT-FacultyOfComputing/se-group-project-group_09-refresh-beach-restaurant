package grp_9.restaurant2.entity;

import grp_9.restaurant2.config.JpaConfig.ReservationStatusConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;
    
    @Column(name = "table_id")
    private Integer tableId;
    
    @Column(name = "reservation_date")
    private LocalDate reservationDate;
    
    @Column(name = "reservation_time")
    private LocalTime reservationTime;
    
    @Convert(converter = ReservationStatusConverter.class)
    @Column(name = "status")
    private ReservationStatus status = ReservationStatus.UPCOMING;
    
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;
    
    // Maintain compatibility with any code that uses these fields
    @Transient
    private int peopleCount;
    
    @Transient
    private double price;
    
    @Transient
    private String contactNumber;
    
    @Column(name = "customer_email")
    private String customerEmail;
    
    // Transient field to store the table number
    @Transient
    private int tableNumber;
}

