package com.bskjp.refresh.restaurant.service;

import com.bskjp.refresh.restaurant.dto.NewPasswordDTO;
import com.bskjp.refresh.restaurant.dto.PasswordResetRequestDTO;
import com.bskjp.refresh.restaurant.exception.CustomException;
import com.bskjp.refresh.restaurant.model.Notification;
import com.bskjp.refresh.restaurant.model.PasswordResetToken;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.PasswordResetTokenRepository;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import com.bskjp.refresh.restaurant.utils.PasswordUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final NotificationService notificationService;
    private final EmailService emailService;

    public PasswordService(UserRepository userRepository,
                           PasswordResetTokenRepository passwordResetTokenRepository,
                           PasswordEncoder passwordEncoder,
                           NotificationService notificationService,
                           EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.notificationService = notificationService;
        this.emailService = emailService;
    }

    @Transactional
    public void requestPasswordReset(PasswordResetRequestDTO requestDTO) throws Throwable {
        User user = (User) userRepository.findByEmail(requestDTO.getEmail())
                .orElseThrow(() -> new CustomException("Email not found", HttpStatus.NOT_FOUND));

        // Delete any existing token for this user
        passwordResetTokenRepository.findByUser(user)
                .ifPresent(passwordResetTokenRepository::delete);

        // Create new token
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusHours(24));

        passwordResetTokenRepository.save(passwordResetToken);

        // Send email with reset link
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        String emailContent = "Please click the link below to reset your password:\n" + resetLink;
        emailService.sendEmail(user.getEmail(), "Password Reset Request", emailContent);

        // Create notification
        notificationService.createNotification(
                user,
                "A password reset request has been initiated for your account.",
                Notification.NotificationType.PASSWORD_RESET
        );
    }

    @Transactional
    public void resetPassword(NewPasswordDTO newPasswordDTO) {
        if (!newPasswordDTO.getPassword().equals(newPasswordDTO.getConfirmPassword())) {
            throw new CustomException("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        if (!PasswordUtils.isStrongPassword(newPasswordDTO.getPassword())) {
            throw new CustomException("Password is not strong enough. It must contain at least 8 characters including uppercase, lowercase, numbers, and special characters.", HttpStatus.BAD_REQUEST);
        }

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(newPasswordDTO.getToken())
                .orElseThrow(() -> new CustomException("Invalid or expired token", HttpStatus.BAD_REQUEST));

        if (passwordResetToken.isExpired()) {
            passwordResetTokenRepository.delete(passwordResetToken);
            throw new CustomException("Token has expired", HttpStatus.BAD_REQUEST);
        }

        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPasswordDTO.getPassword()));
        userRepository.save(user);

        // Delete the used token
        passwordResetTokenRepository.delete(passwordResetToken);

        // Create notification
        notificationService.createNotification(
                user,
                "Your password has been successfully reset.",
                Notification.NotificationType.PASSWORD_RESET
        );
    }

    @Transactional
    public void changePassword(Long userId, String currentPassword, String newPassword) throws Throwable {
        User user = (User) userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new CustomException("Current password is incorrect", HttpStatus.BAD_REQUEST);
        }

        if (!PasswordUtils.isStrongPassword(newPassword)) {
            throw new CustomException("Password is not strong enough. It must contain at least 8 characters including uppercase, lowercase, numbers, and special characters.", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Create notification
        notificationService.createNotification(
                user,
                "Your password has been successfully changed.",
                Notification.NotificationType.PASSWORD_RESET
        );
    }
}