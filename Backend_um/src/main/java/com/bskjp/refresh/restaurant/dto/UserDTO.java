package com.bskjp.refresh.restaurant.dto;

import com.bskjp.refresh.restaurant.model.Address;
import com.bskjp.refresh.restaurant.model.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    private String password;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;

    private UserRole role;

    private boolean enabled;

    private List<Address> addresses;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}