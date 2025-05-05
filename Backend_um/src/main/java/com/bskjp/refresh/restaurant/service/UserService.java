package com.bskjp.refresh.restaurant.service;

import com.bskjp.refresh.restaurant.dto.NotificationPreferencesDTO;
import com.bskjp.refresh.restaurant.dto.UserDTO;
import com.bskjp.refresh.restaurant.exception.ResourceNotFoundException;
import com.bskjp.refresh.restaurant.model.Address;
import com.bskjp.refresh.restaurant.model.NotificationPreferences;
import com.bskjp.refresh.restaurant.model.Order;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return convertToDTO(user);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());

        // Handle password update
        /*if (userDTO.getCurrentPassword() != null && !userDTO.getCurrentPassword().isEmpty()
                && userDTO.getNewPassword() != null && !userDTO.getNewPassword().isEmpty()) {

            if (!passwordEncoder.matches(userDTO.getCurrentPassword(), user.getPassword())) {
                throw new RuntimeException("Current password is incorrect");
            }
            user.setPassword(passwordEncoder.encode(userDTO.getNewPassword()));
        } */

        // Handle notification preferences update
        if (userDTO.getNotificationPreferences() != null) {
            NotificationPreferences preferences = user.getNotificationPreferences();
            if (preferences == null) {
                preferences = new NotificationPreferences();
            }
            NotificationPreferencesDTO npDTO = userDTO.getNotificationPreferences();

            preferences.setOrderUpdates(npDTO.isOrderUpdates());
            preferences.setPromotions(npDTO.isPromotions());
            preferences.setReservationReminders(npDTO.isReservationReminders());
            preferences.setMenuUpdates(npDTO.isMenuUpdates());
            preferences.setSpecialEvents(npDTO.isSpecialEvents());

            user.setNotificationPreferences(preferences);
        }

        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

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

        if (user.getNotificationPreferences() != null) {
            NotificationPreferences preferences = user.getNotificationPreferences();
            NotificationPreferencesDTO npDTO = new NotificationPreferencesDTO();
            npDTO.setOrderUpdates(preferences.isOrderUpdates());
            npDTO.setPromotions(preferences.isPromotions());
            npDTO.setReservationReminders(preferences.isReservationReminders());
            npDTO.setMenuUpdates(preferences.isMenuUpdates());
            npDTO.setSpecialEvents(preferences.isSpecialEvents());
            userDTO.setNotificationPreferences(npDTO);
        }

        return userDTO;
    }

    public UserDTO addAddress(Long userId, @Valid Address address) {
        return null;
    }


    public UserDTO deleteAddress(Long userId, Long addressId) {

        return null;
    }

    public UserDTO setDefaultAddress(Long userId, Long addressId) {

        return null;
    }

    public List<Order> getOrderHistory(Long userId) {

        return List.of();
    }

    public UserDTO createUser(@Valid UserDTO userDTO) {

        return userDTO;
    }
}
