package com.bskjp.refresh.restaurant.service;

import com.bskjp.refresh.restaurant.model.Order;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.OrderRepository;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import com.bskjp.refresh.restaurant.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return orderRepository.findByUser(user);
    }

    public List<Order> getOrdersByDate(Long userId, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return orderRepository.findByUserAndOrderDateBetween(user, date.atStartOfDay(), date.atTime(23, 59, 59));
    }
}
