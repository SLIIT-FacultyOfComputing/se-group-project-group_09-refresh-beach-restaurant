package com.bskjp.refresh.restaurant.service;

import com.bskjp.refresh.restaurant.dto.AuthRequest;
import com.bskjp.refresh.restaurant.dto.AuthResponse;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
import java.lang.RuntimeException;



@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    //@Autowired
    //private JavaMailSender mailSender;  // For sending emails

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse signup(AuthRequest authRequest) {
        if (userRepository.existsByUsername(authRequest.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        User user = new User();
        user.setUsername(authRequest.getUsername());
        user.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        user.setEmail(authRequest.getEmail());

        userRepository.save(user);
        return new AuthResponse("Signup successful", "token_placeholder");
    }

    public AuthResponse login(AuthRequest authRequest) {
        User user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = "generated_jwt_token"; // Token generation logic should be added
        return new AuthResponse("Login successful", token);
    }

    /* Forgot Password Logic
    public String forgotPassword(String email) {
        // Find user by email, or throw exception if not found
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate reset token and URL (you would replace with actual logic)
        String resetToken = generateResetToken();
        String resetUrl = "http://yourfrontend.com/reset-password?token=" + resetToken;

        try {
            sendResetEmail(user.getEmail(), resetUrl);
            return "Password reset instructions have been sent to your email.";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error occurred while sending reset email.";
        }
    }

    private String generateResetToken() {
    }


     Sends a reset password email
    private void sendResetEmail(String email, String resetUrl) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("Password Reset Request");
        helper.setText("Click the following link to reset your password: " + resetUrl);

        mailSender.send(message);
    }*/
}
