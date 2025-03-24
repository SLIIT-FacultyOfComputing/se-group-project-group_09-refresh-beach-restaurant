package com.refreshbeach.backend.service;

import com.refreshbeach.backend.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TableServiceSimple {
    
    private final TableRepository tableRepository;
    
    @Autowired
    public TableServiceSimple(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }
} 