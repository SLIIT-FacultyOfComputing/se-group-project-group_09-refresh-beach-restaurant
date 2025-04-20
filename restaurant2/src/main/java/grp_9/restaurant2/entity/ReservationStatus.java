package grp_9.restaurant2.entity;

/**
 * Enum for reservation status with case-insensitive lookup support
 */
public enum ReservationStatus {
    UPCOMING,
    PAST,
    CANCELED;
    
    /**
     * Custom method to handle case-insensitive lookup
     * This allows the database values to be parsed regardless of case
     */
    public static ReservationStatus fromString(String value) {
        for (ReservationStatus status : ReservationStatus.values()) {
            if (status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No enum constant " + 
                ReservationStatus.class.getName() + "." + value);
    }
} 