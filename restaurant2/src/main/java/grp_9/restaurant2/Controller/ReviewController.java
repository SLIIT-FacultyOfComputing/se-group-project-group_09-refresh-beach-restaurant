package grp_9.restaurant2.Controller;

import grp_9.restaurant2.entity.Review;
import grp_9.restaurant2.entity.MenuItem;
import grp_9.restaurant2.repository.MenuItemRepository;
import grp_9.restaurant2.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private MenuItemRepository menuItemRepository;

    @GetMapping("/menu/{menuItemId}")
    public List<Review> getReviewsByMenuItem(@PathVariable Long menuItemId) {
        return reviewService.getReviewsByMenuItem(menuItemId);
    }

    @PostMapping("/menu/{menuItemId}")
    public Review addReview(@PathVariable Long menuItemId, @RequestBody Review review) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
            .orElseThrow(() -> new RuntimeException("Menu item not found"));
        review.setMenuItem(menuItem);
        return reviewService.saveReview(review);
    }
} 