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
    
    // Helper method to check if table is available
    public boolean isReserved() {
        return status != TableStatus.AVAILABLE;
    }
    
    // Helper method to set table as reserved
    public void setReserved(boolean reserved) {
        this.status = reserved ? TableStatus.RESERVED : TableStatus.AVAILABLE;
    }
} 