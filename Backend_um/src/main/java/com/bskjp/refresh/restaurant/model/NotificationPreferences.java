package com.bskjp.refresh.restaurant.model;


import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "notification_preferences")
public class NotificationPreferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_updates")
    private boolean orderUpdates = true;

    @Column(name = "promotions")
    private boolean promotions = true;

    @Column(name = "reservation_reminders")
    private boolean reservationReminders = true;

    @Column(name = "menu_updates")
    private boolean menuUpdates = false;

    @Column(name = "special_events")
    private boolean specialEvents = true;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
