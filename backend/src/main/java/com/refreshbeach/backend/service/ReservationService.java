package com.refreshbeach.backend.service;

import com.refreshbeach.backend.dto.ReservationDto;
import com.refreshbeach.backend.exception.ReservationNotFoundException;
import com.refreshbeach.backend.exception.TableAlreadyReservedException;
import com.refreshbeach.backend.exception.TableNotFoundException;
import com.refreshbeach.backend.exception.UserNotFoundException;
import com.refreshbeach.backend.model.Reservation;
import com.refreshbeach.backend.model.ReservationStatus;
import com.refreshbeach.backend.model.RestaurantTable;
import com.refreshbeach.backend.model.User;
import com.refreshbeach.backend.repository.ReservationRepository;
import com.refreshbeach.backend.repository.TableRepository;
import com.refreshbeach.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservationService {
    
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);
    
    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;
    private final UserRepository userRepository;
    
    @Autowired
    public ReservationService(ReservationRepository reservationRepository,
                             TableRepository tableRepository,
                             UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
        this.userRepository = userRepository;
    }
    
    @Transactional
    public Reservation createReservation(ReservationDto reservationDto) {
        // Check if table is already reserved
        if (reservationRepository.isTableReserved(
                reservationDto.getTableId(),
                reservationDto.getReservationDate(),
                reservationDto.getReservationTime())) {
            throw new TableAlreadyReservedException("Table is already reserved at this time.");
        }
        
        // Get user and table
        User customer = userRepository.findById(reservationDto.getCustomerId())
            .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        RestaurantTable table = tableRepository.findById(reservationDto.getTableId())
            .orElseThrow(() -> new TableNotFoundException("Table not found"));
        
        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setCustomer(customer);
        reservation.setTable(table);
        reservation.setReservationDate(reservationDto.getReservationDate());
        reservation.setReservationTime(reservationDto.getReservationTime());
        reservation.setStatus(ReservationStatus.Upcoming);
        reservation.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        
        return reservationRepository.save(reservation);
    }
    
    public List<Reservation> getUserReservations(Long userId) {
        try {
            logger.info("Starting getUserReservations for user ID: {}", userId);
            
            // Check if user exists first
            logger.info("Checking if user exists with ID: {}", userId);
            User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    logger.error("User not found with ID: {}", userId);
                    return new UserNotFoundException("User not found with ID: " + userId);
                });
            logger.info("Found user: {} (ID: {})", user.getFullName(), userId);
            
            // Get reservations
            logger.info("Fetching reservations for user ID: {}", userId);
            List<Reservation> reservations = reservationRepository.findByCustomerId(userId);
            logger.info("Found {} reservations for user ID: {}", reservations.size(), userId);
            
            // Log details of each reservation
            for (Reservation reservation : reservations) {
                try {
                    logger.info("Processing reservation ID: {}", reservation.getReservationId());
                    
                    String customerName = "Unknown";
                    if (reservation.getCustomer() != null) {
                        customerName = reservation.getCustomer().getFullName();
                    } else {
                        logger.warn("Customer is null for reservation {}", reservation.getReservationId());
                    }
                    
                    Integer tableNumber = null;
                    if (reservation.getTable() != null) {
                        tableNumber = reservation.getTable().getTableNumber();
                    } else {
                        logger.warn("Table is null for reservation {}", reservation.getReservationId());
                    }
                    
                    String status = "Unknown";
                    if (reservation.getStatus() != null) {
                        status = reservation.getStatus().toString();
                    } else {
                        logger.warn("Status is null for reservation {}", reservation.getReservationId());
                    }
                    
                    logger.info("Reservation details - ID: {}, Customer: {}, Table: {}, Date: {}, Time: {}, Status: {}",
                        reservation.getReservationId(),
                        customerName,
                        tableNumber,
                        reservation.getReservationDate(),
                        reservation.getReservationTime(),
                        status);
                } catch (Exception e) {
                    logger.error("Error processing reservation {}: {}", reservation.getReservationId(), e.getMessage(), e);
                }
            }
            
            return reservations;
        } catch (UserNotFoundException e) {
            logger.error("User not found with ID: {}", userId);
            throw e;
        } catch (Exception e) {
            logger.error("Error fetching reservations for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Error fetching reservations for user " + userId + ": " + e.getMessage(), e);
        }
    }
    
    public List<Reservation> getReservationsForDateAndTime(LocalDate date, LocalTime time) {
        return reservationRepository.findByReservationDateAndReservationTime(date, time);
    }
    
    @Transactional
    public Reservation cancelReservation(Integer reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
            .orElseThrow(() -> new ReservationNotFoundException("Reservation not found"));
        
        reservation.setStatus(ReservationStatus.Canceled);
        return reservationRepository.save(reservation);
    }
    
    public Reservation getReservationById(Integer reservationId) {
        return reservationRepository.findById(reservationId)
            .orElseThrow(() -> new ReservationNotFoundException("Reservation not found"));
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    private Reservation createReservationFromDto(ReservationDto dto) {
        // Implementation of createReservationFromDto method
        // This method should return a Reservation object created from the given ReservationDto
        // Implementation details are not provided in the original file or the code block
        // This method should be implemented based on the requirements of the application
        throw new UnsupportedOperationException("Method not implemented");
    }
} 