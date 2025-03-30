package grp_9.restaurant2.service;

import grp_9.restaurant2.entity.Reservation;
import grp_9.restaurant2.entity.ReservationStatus;
import grp_9.restaurant2.entity.RestaurantTable;
import grp_9.restaurant2.entity.TableStatus;
import grp_9.restaurant2.repository.ReservationRepository;
import grp_9.restaurant2.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, TableRepository tableRepository) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
    }

    @Transactional
    public Reservation saveReservation(Reservation reservation) {
        // Set default values for the new fields
        if (reservation.getStatus() == null) {
            reservation.setStatus(ReservationStatus.UPCOMING);
        }
        
        System.out.println("DEBUG: Saving reservation: " + reservation);
        Reservation saved = reservationRepository.save(reservation);
        System.out.println("DEBUG: SAVED RESERVATION TO DATABASE: " + saved);
        
        return saved;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
    
    public List<Reservation> getReservationsByCustomerId(Long customerId) {
        return reservationRepository.findByCustomerId(customerId);
    }
    
    @Transactional
    public Reservation createReservation(Long customerId, Long tableId, LocalDate date, 
                                        LocalTime time, int peopleCount, String contactNumber) {
        System.out.println("DEBUG: Creating reservation with customerId=" + customerId + 
                          ", tableId=" + tableId + ", date=" + date + ", time=" + time + 
                          ", peopleCount=" + peopleCount + ", contactNumber=" + contactNumber);
                          
        // Check if table exists
        Optional<RestaurantTable> tableOpt = tableRepository.findById(tableId);
        if (tableOpt.isEmpty()) {
            System.out.println("DEBUG: Table not found with ID: " + tableId);
            throw new RuntimeException("Table not found with ID: " + tableId);
        }
        
        RestaurantTable table = tableOpt.get();
        System.out.println("DEBUG: Found table: " + table);
        
        // Verify capacity
        if (peopleCount > table.getCapacity()) {
            System.out.println("DEBUG: Capacity check failed - table capacity: " + table.getCapacity() + 
                              ", requested: " + peopleCount);
            throw new RuntimeException("Table capacity (" + table.getCapacity() + 
                                      ") is less than requested people count (" + peopleCount + ")");
        }
        
        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setTableId(tableId.intValue()); // Convert Long to Integer for tableId
        reservation.setCustomerId(customerId);
        reservation.setPeopleCount(peopleCount);
        reservation.setPrice(0.0); // This could be calculated based on some business rules
        reservation.setContactNumber(contactNumber);
        reservation.setReservationDate(date);
        reservation.setReservationTime(time);
        reservation.setStatus(ReservationStatus.UPCOMING);
        
        System.out.println("DEBUG: Saving reservation: " + reservation);
        Reservation savedReservation = reservationRepository.save(reservation);
        System.out.println("DEBUG: SAVED RESERVATION TO DATABASE: " + savedReservation);
        
        // Update table status
        table.setStatus(TableStatus.RESERVED);
        System.out.println("DEBUG: Updating table " + table.getId() + " to status: " + table.getStatus());
        tableRepository.save(table);
        System.out.println("DEBUG: Table updated successfully, status: " + table.getStatus());
        
        return savedReservation;
    }
    
    @Transactional
    public boolean cancelReservation(Long reservationId) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(reservationId);
        if (reservationOpt.isEmpty()) {
            return false;
        }
        
        Reservation reservation = reservationOpt.get();
        
        // Update the reservation status to CANCELED
        reservation.setStatus(ReservationStatus.CANCELED);
        reservationRepository.save(reservation);
        
        // Free up the table
        Optional<RestaurantTable> tableOpt = tableRepository.findById(Long.valueOf(reservation.getTableId()));
        if (tableOpt.isPresent()) {
            RestaurantTable table = tableOpt.get();
            table.setStatus(TableStatus.AVAILABLE);
            tableRepository.save(table);
        }
        
        return true;
    }
}
