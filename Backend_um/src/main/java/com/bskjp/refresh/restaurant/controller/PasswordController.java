package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.dto.NewPasswordDTO;
import com.bskjp.refresh.restaurant.dto.PasswordResetRequestDTO;
import com.bskjp.refresh.restaurant.service.PasswordService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    private final PasswordService passwordService;

    public PasswordController(PasswordService passwordService) {
        this.passwordService = passwordService;
    }

    @PostMapping("/request-reset")
    public ResponseEntity<Map<String, String>> requestPasswordReset(@Valid @RequestBody PasswordResetRequestDTO requestDTO) throws Throwable {
        passwordService.requestPasswordReset(requestDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset email sent successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody NewPasswordDTO newPasswordDTO) {
        passwordService.resetPassword(newPasswordDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password has been reset successfully");
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/change")
    public ResponseEntity<Map<String, String>> changePassword(
            @RequestParam Long userId,
            @RequestParam String currentPassword,
            @RequestParam String newPassword) throws Throwable {
        passwordService.changePassword(userId, currentPassword, newPassword);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password changed successfully");
        return ResponseEntity.ok(response);
    }
}