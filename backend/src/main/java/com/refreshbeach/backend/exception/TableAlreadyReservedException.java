package com.refreshbeach.backend.exception;

public class TableAlreadyReservedException extends RuntimeException {
    public TableAlreadyReservedException(String message) {
        super(message);
    }
} 