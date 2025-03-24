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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservationService {
    
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
        reservation.setStatus(ReservationStatus.UPCOMING);
        reservation.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        
        return reservationRepository.save(reservation);
    }
    
    public List<Reservation> getUserReservations(Long userId) {
        return reservationRepository.findByCustomerId(userId);
    }
    
    public List<Reservation> getReservationsForDateAndTime(LocalDate date, LocalTime time) {
        return reservationRepository.findByReservationDateAndReservationTime(date, time);
    }
    
    @Transactional
    public Reservation cancelReservation(Integer reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
            .orElseThrow(() -> new ReservationNotFoundException("Reservation not found"));
        
        reservation.setStatus(ReservationStatus.CANCELED);
        return reservationRepository.save(reservation);
    }
    
    public Reservation getReservationById(Integer reservationId) {
        return reservationRepository.findById(reservationId)
            .orElseThrow(() -> new ReservationNotFoundException("Reservation not found"));
    }
} 