package com.bskjp.refresh.restaurant.dto;


import java.time.LocalDate;
import lombok.Data;

@Data
public class PaymentMethodDTO {
    private Long id;
    private Long userId;
    private String cardholderName;
    private String maskedCardNumber; // Last 4 digits only
    private String cardType;
    private String expiryDate; // MM/YY format
    private boolean isDefault;
}
