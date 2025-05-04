package com.bskjp.refresh.restaurant.service;


import com.bskjp.refresh.restaurant.dto.PaymentMethodDTO;
import com.bskjp.refresh.restaurant.dto.PaymentMethodRequestDTO;
import com.bskjp.refresh.restaurant.exception.ResourceNotFoundException;
import com.bskjp.refresh.restaurant.model.PaymentMethod;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.PaymentMethodRepository;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Get all payment methods for a user
     */
    public List<PaymentMethodDTO> getPaymentMethodsByUserId(Long userId) {
        List<PaymentMethod> paymentMethods = paymentMethodRepository.findByUserId(userId);
        return paymentMethods.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Add a new payment method
     */
    @Transactional
    public PaymentMethodDTO addPaymentMethod(Long userId, PaymentMethodRequestDTO requestDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Determine card type (simplified version - in real-world, would use a more robust method)
        String cardType = determineCardType(requestDTO.getCardNumber());

        // Parse expiry date
        YearMonth expiryDate = parseExpiryDate(requestDTO.getExpiryDate());

        // If this is set as default, unset any existing default
        if (requestDTO.isSetDefault()) {
            PaymentMethod defaultCard = paymentMethodRepository.findByUserIdAndIsDefault(userId, true);
            if (defaultCard != null) {
                defaultCard.setDefault(false);
                paymentMethodRepository.save(defaultCard);
            }
        }

        // Create new payment method
        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setUser(user);
        paymentMethod.setCardholderName(requestDTO.getCardholderName());
        paymentMethod.setCardNumber(requestDTO.getCardNumber());
        paymentMethod.setCardType(cardType);
        paymentMethod.setExpiryDate(LocalDate.of(expiryDate.getYear(), expiryDate.getMonth(), 1));
        paymentMethod.setDefault(requestDTO.isSetDefault());

        // Save and convert to DTO
        PaymentMethod savedMethod = paymentMethodRepository.save(paymentMethod);
        return convertToDTO(savedMethod);
    }

    /**
     * Delete a payment method
     */
    @Transactional
    public void deletePaymentMethod(Long userId, Long paymentMethodId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment method not found with id: " + paymentMethodId));

        // Ensure the payment method belongs to the user
        if (!paymentMethod.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Payment method does not belong to user");
        }

        // If this was a default card, we might want to set another card as default
        boolean wasDefault = paymentMethod.isDefault();

        // Delete the payment method
        paymentMethodRepository.deleteById(paymentMethodId);

        // If the deleted card was default, set another card as default if available
        if (wasDefault) {
            List<PaymentMethod> remainingCards = paymentMethodRepository.findByUserId(userId);
            if (!remainingCards.isEmpty()) {
                PaymentMethod newDefault = remainingCards.get(0);
                newDefault.setDefault(true);
                paymentMethodRepository.save(newDefault);
            }
        }
    }

    /**
     * Set a payment method as default
     */
    @Transactional
    public PaymentMethodDTO setDefaultPaymentMethod(Long userId, Long paymentMethodId) {
        // Unset current default if any
        PaymentMethod currentDefault = paymentMethodRepository.findByUserIdAndIsDefault(userId, true);
        if (currentDefault != null) {
            currentDefault.setDefault(false);
            paymentMethodRepository.save(currentDefault);
        }

        // Set new default
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment method not found with id: " + paymentMethodId));

        // Ensure the payment method belongs to the user
        if (!paymentMethod.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Payment method does not belong to user");
        }

        paymentMethod.setDefault(true);
        PaymentMethod savedMethod = paymentMethodRepository.save(paymentMethod);

        return convertToDTO(savedMethod);
    }

    /**
     * Convert entity to DTO
     */
    private PaymentMethodDTO convertToDTO(PaymentMethod paymentMethod) {
        PaymentMethodDTO dto = new PaymentMethodDTO();
        dto.setId(paymentMethod.getId());
        dto.setUserId(paymentMethod.getUser().getId());
        dto.setCardholderName(paymentMethod.getCardholderName());

        // Mask card number - only show last 4 digits
        String cardNumber = paymentMethod.getCardNumber();
        String maskedNumber = "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
        dto.setMaskedCardNumber(maskedNumber);

        dto.setCardType(paymentMethod.getCardType());

        // Format expiry date to MM/YY
        LocalDate expiryDate = paymentMethod.getExpiryDate();
        String formattedExpiry = String.format("%02d/%02d",
                expiryDate.getMonthValue(),
                expiryDate.getYear() % 100);
        dto.setExpiryDate(formattedExpiry);

        dto.setDefault(paymentMethod.isDefault());

        return dto;
    }

    /**
     * Determine card type from number (simplified)
     */
    private String determineCardType(String cardNumber) {
        // Very simplified card type detection
        if (cardNumber.startsWith("4")) {
            return "Visa";
        } else if (cardNumber.startsWith("5")) {
            return "MasterCard";
        } else if (cardNumber.startsWith("3")) {
            return "American Express";
        } else if (cardNumber.startsWith("6")) {
            return "Discover";
        } else {
            return "Other";
        }
    }

    /**
     * Parse expiry date from MM/YY format
     */
    private YearMonth parseExpiryDate(String expiryDate) {
        // Parse from MM/YY format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yy");
        return YearMonth.parse(expiryDate, formatter);
    }
}
