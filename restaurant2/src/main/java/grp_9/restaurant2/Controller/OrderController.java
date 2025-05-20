package grp_9.restaurant2.Controller;

import grp_9.restaurant2.entity.Order;
import grp_9.restaurant2.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping("/checkout")
    public Order checkout(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @PutMapping("/orders/{orderId}")
    public Order updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> body) {
        return orderService.updateOrderStatus(orderId, body.get("status"));
    }

    @DeleteMapping("/orders/{orderId}")
    public void deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
    }
} 