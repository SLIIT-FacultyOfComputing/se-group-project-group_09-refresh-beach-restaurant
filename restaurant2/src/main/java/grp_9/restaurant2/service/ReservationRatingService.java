package grp_9.restaurant2.service;

import grp_9.restaurant2.entity.ReservationRating;
import grp_9.restaurant2.repository.ReservationRatingRepository;
import grp_9.restaurant2.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationRatingService {

    private final ReservationRatingRepository ratingRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationRatingService(ReservationRatingRepository ratingRepository, 
                                    ReservationRepository reservationRepository) {
        this.ratingRepository = ratingRepository;
        this.reservationRepository = reservationRepository;
    }
    
    /**
     * Rate a reservation
     * @param reservationId The ID of the reservation to rate
     * @param rating The rating (1-5)
     * @param reviewText Optional review text
     * @return The created ReservationRating
     * @throws IllegalArgumentException if the reservation doesn't exist or has already been rated
     */
    @Transactional
    public ReservationRating rateReservation(Long reservationId, Integer rating, String reviewText) {
        // Validate the reservation exists
        if (!reservationRepository.existsById(reservationId)) {
            throw new IllegalArgumentException("Reservation not found");
        }
        
        // Validate the rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
        
        // Check if the reservation has already been rated
        if (ratingRepository.existsByReservationId(reservationId)) {
            throw new IllegalArgumentException("Reservation has already been rated");
        }
        
        // Validate review text (if provided) is not too long
        if (reviewText != null && !reviewText.isEmpty()) {
            String[] words = reviewText.trim().split("\\s+");
            if (words.length > 20) {
                throw new IllegalArgumentException("Review text cannot exceed 20 words");
            }
        }
        
        // Create and save the rating
        ReservationRating reservationRating = new ReservationRating();
        reservationRating.setReservationId(reservationId);
        reservationRating.setRating(rating);
        reservationRating.setReviewText(reviewText);
        
        return ratingRepository.save(reservationRating);
    }
    
    /**
     * Check if a reservation has been rated
     * @param reservationId The ID of the reservation
     * @return true if the reservation has been rated, false otherwise
     */
    public boolean isReservationRated(Long reservationId) {
        return ratingRepository.existsByReservationId(reservationId);
    }
    
    /**
     * Get the rating for a reservation
     * @param reservationId The ID of the reservation
     * @return The rating, or null if the reservation has not been rated
     */
    public Optional<ReservationRating> getRatingForReservation(Long reservationId) {
        return ratingRepository.findByReservationId(reservationId);
    }
    
    /**
     * Get all reservation ratings
     * This is primarily for admin use
     * @return List of all reservation ratings
     */
    public List<ReservationRating> getAllRatings() {
        return ratingRepository.findAll();
    }
} 