package grp_9.restaurant2.service;

import grp_9.restaurant2.entity.Review;
import grp_9.restaurant2.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByMenuItem(Long menuItemId) {
        return reviewRepository.findByMenuItemId(menuItemId);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
} 