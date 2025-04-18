package grp_9.restaurant2.config;

import grp_9.restaurant2.entity.ReservationStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import org.springframework.context.annotation.Configuration;

/**
 * JPA Configuration for custom type conversions
 */
@Configuration
public class JpaConfig {
    
    /**
     * Custom converter for ReservationStatus enum to handle case-insensitive database values
     */
    @Converter(autoApply = true)
    public static class ReservationStatusConverter implements AttributeConverter<ReservationStatus, String> {
        
        @Override
        public String convertToDatabaseColumn(ReservationStatus status) {
            return status == null ? null : status.name();
        }
        
        @Override
        public ReservationStatus convertToEntityAttribute(String dbData) {
            return dbData == null ? null : ReservationStatus.fromString(dbData);
        }
    }
} 