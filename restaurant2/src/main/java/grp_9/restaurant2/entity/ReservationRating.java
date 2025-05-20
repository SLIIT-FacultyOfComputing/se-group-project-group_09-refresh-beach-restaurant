package grp_9.restaurant2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reservation_ratings")
public class ReservationRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "reservation_id")
    private Long reservationId;
    
    @Column(name = "rating")
    private Integer rating;
    
    @Column(name = "review_text")
    private String reviewText;
    
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;
} 