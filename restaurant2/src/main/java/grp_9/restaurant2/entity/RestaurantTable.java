package grp_9.restaurant2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@jakarta.persistence.Table(name = "tables")
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_id")
    private Long id;
    
    @Column(name = "table_number")
    private int tableNumber;
    
    private int capacity;
    
    private String location;
    
    @Enumerated(EnumType.STRING)
    private TableStatus status = TableStatus.AVAILABLE;
    
    // Add version field for optimistic locking
    @Version
    private Long version;
    
    // Transient field to indicate temporary reservation status
    // This doesn't affect the database, only used for API responses
    @Transient
    private boolean reserved = false;
    
    // Helper method to check if table is permanently unavailable
    public boolean isPermanentlyUnavailable() {
        return status != TableStatus.AVAILABLE;
    }
    
    // Helper method to set table as permanently unavailable
    public void setPermanentlyUnavailable(boolean unavailable) {
        this.status = unavailable ? TableStatus.OCCUPIED : TableStatus.AVAILABLE;
    }
    
    // Check if table is available for a specific time slot
    public boolean isAvailableForTimeSlot() {
        return !reserved && status == TableStatus.AVAILABLE;
    }
} 