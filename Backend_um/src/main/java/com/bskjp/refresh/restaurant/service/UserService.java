package com.bskjp.refresh.restaurant.service;

import com.bskjp.refresh.restaurant.dto.UserDTO;
import com.bskjp.refresh.restaurant.exception.ResourceNotFoundException;
import com.bskjp.refresh.restaurant.model.Address;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.model.UserRole;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO getUserById(Long id) throws Throwable {
        User user = (User) userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return convertToDTO(user);
    }

    public UserDTO getUserByEmail(String email) throws Throwable {
        User user = (User) userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return convertToDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return (List<UserDTO>) userRepository.findAll().stream()
                .map(user -> convertToDTO((User) user))
                .collect(Collectors.toList());
    }

    public List<UserDTO> getAllCustomers() {
        return (List<UserDTO>) userRepository.findByRole(UserRole.USER).stream()
                .map(user -> convertToDTO((User) user))
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) throws Throwable {
        User user = (User) userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        // Update user fields
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());

        // Only update password if provided
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        // Save and return updated user
        User updatedUser = (User) userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public void deleteUser(Long id) throws Throwable {
        User user = (User) userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
    }

    public UserDTO addAddress(Long userId, Address address) throws Throwable {
        User user = (User) userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // If this is the first address or marked as default, set it as default
        if (user.getAddresses().isEmpty() || address.isDefault()) {
            // Set all existing addresses to non-default
            user.getAddresses().forEach(a -> a.setDefault(false));
            address.setDefault(true);
        }

        user.addAddress(address);
        User updatedUser = (User) userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDTO updateAddress(Long userId, Long addressId, Address updatedAddress) throws Throwable {
        User user = (User) userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Address address = user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));

        // Update address fields
        address.setStreet(updatedAddress.getStreet());
        address.setCity(updatedAddress.getCity());
        address.setState(updatedAddress.getState());
        address.setZipCode(updatedAddress.getZipCode());
        address.setCountry(updatedAddress.getCountry());
        address.setNotes(updatedAddress.getNotes());

        // Handle setting as default address
        if (updatedAddress.isDefault() && !address.isDefault()) {
            // Set all addresses to non-default
            user.getAddresses().forEach(a -> a.setDefault(false));
            address.setDefault(true);
        }

        User savedUser = (User) userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public UserDTO deleteAddress(Long userId, Long addressId) throws Throwable {
        User user = (User) userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Address address = user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));

        boolean wasDefault = address.isDefault();
        user.removeAddress(address);

        // If removed address was default and there are other addresses, set the first one as default
        if (wasDefault && !user.getAddresses().isEmpty()) {
            user.getAddresses().get(0).setDefault(true);
        }

        User updatedUser = (User) userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDTO setDefaultAddress(Long userId, Long addressId) throws Throwable {
        User user = (User) userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Set all addresses to non-default
        user.getAddresses().forEach(a -> a.setDefault(false));

        // Find the address to set as default
        Address address = user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));

        address.setDefault(true);
        User updatedUser = (User) userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    // Admin function
    public UserDTO setUserRole(Long userId, UserRole role) throws Throwable {
        User user = (User) userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setRole(role);
        User updatedUser = (User) userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    // Helper method to convert User entity to UserDTO
    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        userDTO.setEnabled(user.isEnabled());
        userDTO.setAddresses(user.getAddresses());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        return userDTO;
    }
}