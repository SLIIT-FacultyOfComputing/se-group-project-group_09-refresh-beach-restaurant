package com.refreshbeach.backend.converter;

import com.refreshbeach.backend.model.Location;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Converter
public class LocationConverter implements AttributeConverter<Location, String> {
    private static final Logger logger = LoggerFactory.getLogger(LocationConverter.class);

    @Override
    public String convertToDatabaseColumn(Location location) {
        logger.debug("Converting Location to database value: {}", location);
        return location == null ? null : location.name();
    }

    @Override
    public Location convertToEntityAttribute(String dbData) {
        logger.debug("Converting database value to Location: {}", dbData);
        try {
            return dbData == null ? null : Location.fromString(dbData);
        } catch (IllegalArgumentException e) {
            logger.error("Error converting database value to Location: {}", e.getMessage());
            return null;
        }
    }
} 