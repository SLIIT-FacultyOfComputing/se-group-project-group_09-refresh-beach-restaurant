package com.bskjp.refresh.restaurant.dto;

import com.bskjp.refresh.restaurant.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AuthResponse {
    private String token;
    private String refreshToken;
    private String email;
    private Long userId;
    private UserRole role;
    private String firstName;
    private String lastName;
}