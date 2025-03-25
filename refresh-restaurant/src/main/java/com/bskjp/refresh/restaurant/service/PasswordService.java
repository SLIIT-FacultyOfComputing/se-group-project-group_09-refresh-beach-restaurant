package com.bskjp.refresh.restaurant.service;

import com.bskjp.refresh.restaurant.model.PasswordResetToken;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.PasswordResetTokenRepository;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    // Method to send password reset email
    public void sendPasswordResetEmail(String email) {
        // Find the user by email
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }

        // Generate a unique reset token
        String token = UUID.randomUUID().toString();

        // Create a password reset token object
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user.orElse(null));
        resetToken.setToken(token);
        resetToken.setExpiryDate(new Date(System.currentTimeMillis() + 3600000)); // 1 hour expiry

        // Save the token to the database
        passwordResetTokenRepository.save(resetToken);

        // Send email (You would implement an actual email service here)
        // For example: emailService.sendResetPasswordEmail(user, token);
    }

    // Method to reset the password
    public void resetPassword(String token, String newPassword) {
        // Find the password reset token
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().before(new Date())) {
            throw new RuntimeException("Invalid or expired token");
        }

        // Find the user associated with the token
        User user = resetToken.getUser();
        user.setPassword(newPassword); // You should hash the password before saving

        // Save the updated user
        userRepository.save(user);

        // Optionally delete the reset token after it's used
        passwordResetTokenRepository.delete(resetToken);
    }
}
