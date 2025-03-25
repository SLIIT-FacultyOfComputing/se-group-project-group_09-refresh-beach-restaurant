package com.bskjp.refresh.restaurant.exception;

public class CustomException extends RuntimeException {

    private String message;

    // Constructor
    public CustomException(String message) {
        super(message);
        this.message = message;
    }

    // Getter method
    public String getMessage() {
        return message;
    }

    // Setter method (if needed)
    public void setMessage(String message) {
        this.message = message;
    }
}
