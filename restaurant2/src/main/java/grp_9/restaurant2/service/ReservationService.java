package grp_9.restaurant2.service;

import grp_9.restaurant2.entity.Reservation;
import grp_9.restaurant2.entity.ReservationStatus;
import grp_9.restaurant2.entity.RestaurantTable;
import grp_9.restaurant2.entity.TableStatus;
import grp_9.restaurant2.repository.ReservationRepository;
import grp_9.restaurant2.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
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

    // Scheduled task to update reservation statuses
    // Runs every hour (3600000 ms)
    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void updatePastReservations() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        
        System.out.println("Running scheduled task to update past reservations...");
        
        List<Reservation> pastReservations = reservationRepository.findPastUpcomingReservations(currentDate, currentTime);
        
        System.out.println("Found " + pastReservations.size() + " reservations to update to PAST status");
        
        for (Reservation reservation : pastReservations) {
            reservation.setStatus(ReservationStatus.PAST);
            reservationRepository.save(reservation);
            System.out.println("Updated reservation #" + reservation.getId() + " to PAST status");
        }
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
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        
        // Update any past reservations before returning the list
        List<Reservation> pastReservations = reservationRepository.findPastUpcomingReservations(currentDate, currentTime);
        for (Reservation reservation : pastReservations) {
            reservation.setStatus(ReservationStatus.PAST);
            reservationRepository.save(reservation);
        }
        
        // Get all reservations for the customer
        List<Reservation> customerReservations = reservationRepository.findByCustomerId(customerId);
        
        // Fetch table information for each reservation
        for (Reservation reservation : customerReservations) {
            // Get the table number for each reservation
            if (reservation.getTableId() != null) {
                Optional<RestaurantTable> table = tableRepository.findById(reservation.getTableId().longValue());
                if (table.isPresent()) {
                    reservation.setTableNumber(table.get().getTableNumber());
                }
            }
        }
        
        return customerReservations;
    }
    
    @Retryable(
        value = {OptimisticLockingFailureException.class, ObjectOptimisticLockingFailureException.class},
        maxAttempts = 3,
        backoff = @Backoff(delay = 500)
    )
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Reservation createReservation(Long customerId, Long tableId, LocalDate date, 
                                        LocalTime time, int peopleCount, String contactNumber) {
        System.out.println("DEBUG: Creating reservation with customerId=" + customerId + 
                          ", tableId=" + tableId + ", date=" + date + ", time=" + time + 
                          ", peopleCount=" + peopleCount + ", contactNumber=" + contactNumber);
                          
        // Use pessimistic locking to prevent concurrent modifications of the same table
        Optional<RestaurantTable> tableOpt = tableRepository.findByIdWithLock(tableId);
        if (tableOpt.isEmpty()) {
            System.out.println("DEBUG: Table not found with ID: " + tableId);
            throw new RuntimeException("Table not found with ID: " + tableId);
        }
        
        RestaurantTable table = tableOpt.get();
        System.out.println("DEBUG: Found table: " + table);
        
        // Check if table is already reserved for this date and time using case-insensitive query
        List<Reservation> existingReservations = reservationRepository.findUpcomingReservations(
            tableId.intValue(), date, time);
        
        if (!existingReservations.isEmpty()) {
            System.out.println("DEBUG: Table " + tableId + " is already reserved for " + date + " at " + time);
            throw new RuntimeException("This table is already reserved for the selected date and time");
        }
        
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
        
        // We no longer update the table status to keep tables available for other time slots
        // This allows the same table to be reserved at different times/dates
        
        return savedReservation;
    }
    
    @Retryable(
        value = {OptimisticLockingFailureException.class, ObjectOptimisticLockingFailureException.class},
        maxAttempts = 3,
        backoff = @Backoff(delay = 500)
    )
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public boolean cancelReservation(Long reservationId) {
        Optional<Reservation> reservationOpt = reservationRepository.findById(reservationId);
        if (reservationOpt.isEmpty()) {
            return false;
        }
        
        Reservation reservation = reservationOpt.get();
        
        // Update the reservation status to CANCELED
        reservation.setStatus(ReservationStatus.CANCELED);
        reservationRepository.save(reservation);
        
        // No need to change table status since we don't change it when creating reservations
        
        return true;
    }
}