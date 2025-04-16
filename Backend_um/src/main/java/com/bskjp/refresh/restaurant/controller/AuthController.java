package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.dto.AuthRequest;
import com.bskjp.refresh.restaurant.dto.AuthResponse;
import com.bskjp.refresh.restaurant.dto.UserDTO;
import com.bskjp.refresh.restaurant.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) throws Throwable {
        return ResponseEntity.ok(authService.login(authRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(authService.register(userDTO), HttpStatus.CREATED);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody String refreshToken) throws Throwable {
        return ResponseEntity.ok(authService.refreshToken(refreshToken));
    }

}