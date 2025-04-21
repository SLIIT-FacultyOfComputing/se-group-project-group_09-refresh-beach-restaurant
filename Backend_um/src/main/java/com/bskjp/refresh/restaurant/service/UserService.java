package com.bskjp.refresh.restaurant.service;

import com.bskjp.refresh.restaurant.dto.UserDTO;
import com.bskjp.refresh.restaurant.exception.ResourceNotFoundException;
import com.bskjp.refresh.restaurant.model.Address;
import com.bskjp.refresh.restaurant.model.Order;
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
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return convertToDTO(user);
    }

    public UserDTO getUserByEmail(String email) throws Throwable {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return convertToDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getAllCustomers() {
        return userRepository.findByRole(UserRole.USER).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) throws Throwable {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public void deleteUser(Long id) throws Throwable {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
    }

    public UserDTO addAddress(Long userId, Address address) throws Throwable {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (user.getAddresses().isEmpty() || address.isDefault()) {
            user.getAddresses().forEach(a -> a.setDefault(false));
            address.setDefault(true);
        }

        user.addAddress(address);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDTO updateAddress(Long userId, Long addressId, Address updatedAddress) throws Throwable {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Address address = user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));

        address.setStreet(updatedAddress.getStreet());
        address.setCity(updatedAddress.getCity());
        address.setState(updatedAddress.getState());
        address.setZipCode(updatedAddress.getZipCode());
        address.setCountry(updatedAddress.getCountry());
        address.setNotes(updatedAddress.getNotes());

        if (updatedAddress.isDefault() && !address.isDefault()) {
            user.getAddresses().forEach(a -> a.setDefault(false));
            address.setDefault(true);
        }

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public UserDTO deleteAddress(Long userId, Long addressId) throws Throwable {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Address address = user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));

        boolean wasDefault = address.isDefault();
        user.removeAddress(address);

        if (wasDefault && !user.getAddresses().isEmpty()) {
            user.getAddresses().get(0).setDefault(true);
        }

        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDTO setDefaultAddress(Long userId, Long addressId) throws Throwable {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.getAddresses().forEach(a -> a.setDefault(false));

        Address address = user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressId));

        address.setDefault(true);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDTO setUserRole(Long userId, UserRole role) throws Throwable {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setRole(role);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    // 🔥 ORDER HISTORY LOGIC
    public List<Order> getOrderHistory(Long userId) throws Throwable {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return user.getOrders(); // Ensure `orders` is mapped in User class
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
        return userDTO;
    }
}
