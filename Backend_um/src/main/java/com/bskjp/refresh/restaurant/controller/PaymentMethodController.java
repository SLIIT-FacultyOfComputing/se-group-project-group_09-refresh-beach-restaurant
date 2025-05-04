package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.dto.PaymentMethodDTO;
import com.bskjp.refresh.restaurant.dto.PaymentMethodRequestDTO;
import com.bskjp.refresh.restaurant.service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/payment-methods")
public class PaymentMethodController {

    @Autowired
    private PaymentMethodService paymentMethodService;

    /**
     * Get all payment methods for a user
     */
    @GetMapping("/user/{userId}")
    @PreAuthorize("authentication.principal.id == #userId or hasRole('ADMIN')")
    public ResponseEntity<List<PaymentMethodDTO>> getPaymentMethodsByUserId(@PathVariable Long userId) {
        List<PaymentMethodDTO> paymentMethods = paymentMethodService.getPaymentMethodsByUserId(userId);
        return ResponseEntity.ok(paymentMethods);
    }

    /**
     * Add a new payment method
     */
    @PostMapping("/user/{userId}")
    @PreAuthorize("authentication.principal.id == #userId or hasRole('ADMIN')")
    public ResponseEntity<PaymentMethodDTO> addPaymentMethod(
            @PathVariable Long userId,
            @Valid @RequestBody PaymentMethodRequestDTO requestDTO) {
        PaymentMethodDTO paymentMethod = paymentMethodService.addPaymentMethod(userId, requestDTO);
        return new ResponseEntity<>(paymentMethod, HttpStatus.CREATED);
    }

    /**
     * Delete a payment method
     */
    @DeleteMapping("/user/{userId}/{paymentMethodId}")
    @PreAuthorize("authentication.principal.id == #userId or hasRole('ADMIN')")
    public ResponseEntity<Void> deletePaymentMethod(
            @PathVariable Long userId,
            @PathVariable Long paymentMethodId) {
        paymentMethodService.deletePaymentMethod(userId, paymentMethodId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Set a payment method as default
     */
    @PutMapping("/user/{userId}/{paymentMethodId}/default")
    @PreAuthorize("authentication.principal.id == #userId or hasRole('ADMIN')")
    public ResponseEntity<PaymentMethodDTO> setDefaultPaymentMethod(
            @PathVariable Long userId,
            @PathVariable Long paymentMethodId) {
        PaymentMethodDTO paymentMethod = paymentMethodService.setDefaultPaymentMethod(userId, paymentMethodId);
        return ResponseEntity.ok(paymentMethod);
    }
}