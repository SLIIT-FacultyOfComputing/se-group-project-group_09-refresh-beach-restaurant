package com.bskjp.refresh.restaurant.repository;

import com.bskjp.refresh.restaurant.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    PasswordResetToken findByUserId(Long userId);
}
