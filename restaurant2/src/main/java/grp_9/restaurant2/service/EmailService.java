package grp_9.restaurant2.service;

import grp_9.restaurant2.entity.Reservation;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy");
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("h:mm a");
    
    @Value("${mail.testing.enabled:false}")
    private boolean testingEnabled;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendReservationReminder(Reservation reservation) {
        if (reservation.getCustomerEmail() == null || reservation.getCustomerEmail().trim().isEmpty()) {
            System.out.println("Cannot send reminder email - no email address for reservation ID: " + reservation.getId());
            return;
        }

        String emailContent = buildReservationReminderEmail(reservation);
        
        if (testingEnabled) {
            // In test mode, just log the email content instead of sending
            System.out.println("=== TEST MODE: Email would be sent ===");
            System.out.println("To: " + reservation.getCustomerEmail());
            System.out.println("Subject: Reminder: Your Reservation Tomorrow");
            System.out.println("Content: " + emailContent);
            System.out.println("=== END TEST EMAIL ===");
            return;
        }
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(reservation.getCustomerEmail());
            helper.setSubject("Reminder: Your Reservation Tomorrow");
            helper.setText(emailContent, true);

            mailSender.send(message);
            System.out.println("Reservation reminder email sent to: " + reservation.getCustomerEmail());
        } catch (MessagingException e) {
            System.err.println("Failed to send reminder email for reservation ID: " + reservation.getId());
            e.printStackTrace();
        }
    }

    private String buildReservationReminderEmail(Reservation reservation) {
        String formattedDate = reservation.getReservationDate().format(DATE_FORMATTER);
        String formattedTime = reservation.getReservationTime().format(TIME_FORMATTER);

        return "<html><body>" +
                "<h2>Reservation Reminder</h2>" +
                "<p>This is a friendly reminder about your reservation tomorrow.</p>" +
                "<h3>Reservation Details:</h3>" +
                "<ul>" +
                "<li><strong>Date:</strong> " + formattedDate + "</li>" +
                "<li><strong>Time:</strong> " + formattedTime + "</li>" +
                "<li><strong>Table Number:</strong> " + reservation.getTableNumber() + "</li>" +
                "<li><strong>Number of People:</strong> " + reservation.getPeopleCount() + "</li>" +
                "</ul>" +
                "<p>We look forward to seeing you tomorrow!</p>" +
                "<p>If you need to cancel or modify your reservation, please contact us as soon as possible.</p>" +
                "<p>Thank you for choosing our restaurant.</p>" +
                "</body></html>";
    }
} 