package com.bskjp.refresh.restaurant.repository;

import com.bskjp.refresh.restaurant.model.Order;
import com.bskjp.refresh.restaurant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByUserAndOrderDateBetween(User user, LocalDate startDate, LocalDate endDate);
    List<Order> findByUserAndOrderDate(User user, LocalDate date);

    List<Order> findByUserAndOrderDateBetween(User user, LocalDateTime localDateTime, LocalDateTime localDateTime1);
}
