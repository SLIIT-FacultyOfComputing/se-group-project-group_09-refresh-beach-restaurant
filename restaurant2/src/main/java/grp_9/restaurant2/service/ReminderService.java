package grp_9.restaurant2.service;

import grp_9.restaurant2.entity.Reservation;
import grp_9.restaurant2.entity.ReservationStatus;
import grp_9.restaurant2.entity.RestaurantTable;
import grp_9.restaurant2.repository.ReservationRepository;
import grp_9.restaurant2.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReminderService {

    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;
    private final EmailService emailService;

    @Autowired
    public ReminderService(ReservationRepository reservationRepository, 
                          TableRepository tableRepository,
                          EmailService emailService) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
        this.emailService = emailService;
    }

    // Run daily at 10:00 AM
    @Scheduled(cron = "0 0 10 * * ?")
    @Transactional(readOnly = true)
    public void sendReservationReminders() {
        System.out.println("Running scheduled task to send reservation reminders...");
        
        // Find all upcoming reservations for tomorrow
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<Reservation> tomorrowReservations = findUpcomingReservationsForDate(tomorrow);
        
        System.out.println("Found " + tomorrowReservations.size() + " reservations for tomorrow to send reminders");
        
        // Send reminder emails
        for (Reservation reservation : tomorrowReservations) {
            // Set the table number for the email template
            if (reservation.getTableId() != null) {
                Optional<RestaurantTable> table = tableRepository.findById(reservation.getTableId().longValue());
                if (table.isPresent()) {
                    reservation.setTableNumber(table.get().getTableNumber());
                }
            }
            
            // Send the reminder email
            emailService.sendReservationReminder(reservation);
        }
        
        System.out.println("Completed sending reservation reminders");
    }

    /**
     * Sends a reminder email for a specific reservation ID
     * This method is intended for testing the email reminder functionality
     * 
     * @param reservationId The ID of the reservation to send a reminder for
     */
    @Transactional(readOnly = true)
    public void sendReminderForReservation(Long reservationId) {
        System.out.println("Sending test email reminder for reservation ID: " + reservationId);
        
        // Find the reservation
        Reservation reservation = reservationRepository.findById(reservationId)
            .orElseThrow(() -> new RuntimeException("Reservation not found with ID: " + reservationId));
        
        // Set the table number for the email template
        if (reservation.getTableId() != null) {
            Optional<RestaurantTable> table = tableRepository.findById(reservation.getTableId().longValue());
            if (table.isPresent()) {
                reservation.setTableNumber(table.get().getTableNumber());
            }
        }
        
        // Send the reminder email
        emailService.sendReservationReminder(reservation);
        
        System.out.println("Test email reminder sent for reservation ID: " + reservationId);
    }
    
    private List<Reservation> findUpcomingReservationsForDate(LocalDate date) {
        // Use the repository method we just created
        return reservationRepository.findUpcomingReservationsByDate(date);
    }
} 