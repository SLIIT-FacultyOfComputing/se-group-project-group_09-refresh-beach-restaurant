package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.model.Order;
import com.bskjp.refresh.restaurant.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/user/{userId}/date")
    public List<Order> getOrdersByDate(
            @PathVariable Long userId,
            @RequestParam("date") String date
    ) {
        LocalDate parsedDate = LocalDate.parse(date);
        return orderService.getOrdersByDate(userId, parsedDate);
    }
}
