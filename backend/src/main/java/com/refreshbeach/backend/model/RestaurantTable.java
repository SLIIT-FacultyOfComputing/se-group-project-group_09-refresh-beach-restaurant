package com.refreshbeach.backend.model;

import com.refreshbeach.backend.converter.LocationConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tables")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_id")
    private Integer tableId;
    
    @Column(name = "table_number")
    private Integer tableNumber;
    
    private Integer capacity;
    
    @Convert(converter = LocationConverter.class)
    private Location location;
    
    @Enumerated(EnumType.STRING)
    private TableStatus status;
    
    @OneToMany(mappedBy = "table", cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();
} 