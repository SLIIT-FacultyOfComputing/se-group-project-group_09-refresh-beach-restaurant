package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.dto.UserDTO;
import com.bskjp.refresh.restaurant.model.Address;
import com.bskjp.refresh.restaurant.model.Order;
import com.bskjp.refresh.restaurant.security.CustomUserDetailsService;
import com.bskjp.refresh.restaurant.service.NotificationService;
import com.bskjp.refresh.restaurant.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        UserDTO user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO) {
        try {
            userService.updateUser(userId, userDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
        return (ResponseEntity<UserDTO>) ResponseEntity.ok();
    }

    @DeleteMapping("/{userId}/addresses/{addressId}")
    public ResponseEntity<UserDTO> deleteAddress(@PathVariable Long userId, @PathVariable Long addressId) throws Throwable {
        return ResponseEntity.ok(userService.deleteAddress(userId, addressId));
    }

    @PutMapping("/{userId}/addresses/{addressId}/default")
    public ResponseEntity<UserDTO> setDefaultAddress(@PathVariable Long userId, @PathVariable Long addressId) throws Throwable {
        return ResponseEntity.ok(userService.setDefaultAddress(userId, addressId));
    }

    @GetMapping("/{userId}/orders")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable Long userId) throws Throwable {
        return ResponseEntity.ok(userService.getOrderHistory(userId));
    }
}
