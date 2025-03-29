package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to update user details
    @PutMapping("/update/{id}")
    public User updateUserDetails(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUserDetails(id, updatedUser);
    }
}
