package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.dto.AuthRequest;
import com.bskjp.refresh.restaurant.dto.AuthResponse;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody AuthRequest authRequest) {
        return authService.signup(authRequest);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        return authService.login(authRequest);
    }
}
