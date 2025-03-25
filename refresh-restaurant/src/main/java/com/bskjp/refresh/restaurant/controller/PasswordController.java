package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    // Endpoint to send the reset email
    @PostMapping("/forgot")
    public String sendPasswordResetEmail(@RequestBody String email) {
        passwordService.sendPasswordResetEmail(email);
        return "Password reset email sent.";
    }

    // Endpoint to reset password using the token
    @PostMapping("/reset")
    public String resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        passwordService.resetPassword(token, newPassword);
        return "Password has been reset successfully.";
    }
}
