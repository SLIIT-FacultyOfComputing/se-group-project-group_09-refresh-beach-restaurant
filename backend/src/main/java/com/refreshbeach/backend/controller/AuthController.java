package com.refreshbeach.backend.controller;

import com.refreshbeach.backend.dto.LoginRequest;
import com.refreshbeach.backend.dto.LoginResponse;
import com.refreshbeach.backend.model.User;
import com.refreshbeach.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(loginRequest.getPassword())) {
            User user = userOpt.get();
            // Create a session
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", user.getId());
            session.setAttribute("username", user.getUsername());
            
            LoginResponse response = new LoginResponse();
            response.setUserId(user.getId());
            response.setUsername(user.getUsername());
            response.setFullName(user.getFullName());
            response.setMessage("Login successful");
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponse(null, null, null, "Invalid username or password"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<LoginResponse> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok(new LoginResponse(null, null, null, "Logged out successfully"));
    }

    @GetMapping("/check")
    public ResponseEntity<LoginResponse> checkSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("userId") != null) {
            Long userId = (Long) session.getAttribute("userId");
            String username = (String) session.getAttribute("username");
            
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                LoginResponse response = new LoginResponse();
                response.setUserId(userId);
                response.setUsername(username);
                response.setFullName(user.getFullName());
                response.setMessage("User is logged in");
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(new LoginResponse(null, null, null, "User is not logged in"));
    }
} 