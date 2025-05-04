package grp_9.restaurant2.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @GetMapping
    public String getOrders() {
        return "Here are all the orders!";
    }

    @PostMapping("/create")
    public String createOrder() {
        return "Order created successfully!";
    }
}
