package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.dto.UserDTO;
import com.bskjp.refresh.restaurant.model.Address;
import com.bskjp.refresh.restaurant.security.CustomUserDetailsService;
import com.bskjp.refresh.restaurant.service.NotificationService;
import com.bskjp.refresh.restaurant.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final CustomUserDetailsService customUserDetailsService;
    private final NotificationService notificationService;

    public UserController(UserService userService,
                          CustomUserDetailsService customUserDetailsService,
                          NotificationService notificationService) {
        this.userService = userService;
        this.customUserDetailsService = customUserDetailsService;
        this.notificationService = notificationService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) throws Throwable {
        return ResponseEntity.ok(userService.getUserByEmail(userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) throws Throwable {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @PostMapping("/{userId}/addresses")
    public ResponseEntity<UserDTO> addAddress(@PathVariable Long userId, @Valid @RequestBody Address address) throws Throwable {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.addAddress(userId, address));
    }

    @PutMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<UserDTO> updateAddress(
            @PathVariable Long userId,
            @PathVariable Long addressId,
            @Valid @RequestBody Address address) throws Throwable {
        return ResponseEntity.ok(userService.updateAddress(userId, addressId, address));
    }

    @DeleteMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<UserDTO> deleteAddress(@PathVariable Long userId, @PathVariable Long addressId) throws Throwable {
        return ResponseEntity.ok(userService.deleteAddress(userId, addressId));
    }

    @PutMapping("/{userId}/addresses/{addressId}/default")
    public ResponseEntity<UserDTO> setDefaultAddress(@PathVariable Long userId, @PathVariable Long addressId) throws Throwable {
        return ResponseEntity.ok(userService.setDefaultAddress(userId, addressId));
    }
}