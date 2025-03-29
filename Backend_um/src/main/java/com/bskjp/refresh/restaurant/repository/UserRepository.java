package com.bskjp.refresh.restaurant.repository;

import com.bskjp.refresh.restaurant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by username
    Optional<User> findByUsername(String username);

    // Check if a username already exists
    boolean existsByUsername(String username);

    // Find user by email, should return Optional<User> for safe null handling
    Optional<User> findByEmail(String email);

    // Find user by id
    Optional<User> findById(Long id);
}
