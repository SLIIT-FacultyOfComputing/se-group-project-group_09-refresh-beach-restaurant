package com.refreshbeach.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableDto {
    private Integer tableId;
    private Integer tableNumber;
    private Integer capacity;
    private String location;
    private String status;
} 