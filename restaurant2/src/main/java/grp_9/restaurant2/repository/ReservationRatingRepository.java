package grp_9.restaurant2.repository;

import grp_9.restaurant2.entity.ReservationRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReservationRatingRepository extends JpaRepository<ReservationRating, Long> {
    
    // Find a rating by reservation ID
    Optional<ReservationRating> findByReservationId(Long reservationId);
    
    // Check if a rating exists for a reservation
    boolean existsByReservationId(Long reservationId);
} 