package com.refreshbeach.backend.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public enum Location {
    INDOOR,
    OUTDOOR;
    
    private static final Logger logger = LoggerFactory.getLogger(Location.class);

    public static Location fromString(String value) {
        if (value == null) {
            return null;
        }
        logger.debug("Converting location value: {}", value);
        
        String normalized = value.trim().toUpperCase();
        logger.debug("Normalized value: {}", normalized);
        
        try {
            return Location.valueOf(normalized);
        } catch (IllegalArgumentException e) {
            // Handle alternative values
            if (normalized.equals("IN") || normalized.equals("I")) {
                return INDOOR;
            } else if (normalized.equals("OUT") || normalized.equals("O")) {
                return OUTDOOR;
            }
            
            logger.error("Failed to convert location value: {}", value);
            throw new IllegalArgumentException("Invalid location value: " + value);
        }
    }
} 