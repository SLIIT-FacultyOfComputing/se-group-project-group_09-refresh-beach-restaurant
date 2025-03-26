package grp_9.restaurant2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reserved")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int peopleCount;
    private double price;
    private String contactNumber;

    private LocalDate reservationDate; // Changed to LocalDate for clarity
    private LocalTime reservationTime; // Added LocalTime to store only time
}

