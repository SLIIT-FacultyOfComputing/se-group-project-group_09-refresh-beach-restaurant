package com.bskjp.refresh.restaurant.service;

import com.bskjp.refresh.restaurant.model.Notification;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.NotificationRepository;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    // --- Existing Functionality ---

    public Notification createNotification(User user, String message, Notification.NotificationType type) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setType(type);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByUser(User user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Notification> getUnreadNotificationsByUser(User user) {
        return notificationRepository.findByUserAndIsReadFalseOrderByCreatedAtDesc(user);
    }

    public long getUnreadNotificationCount(User user) {
        return notificationRepository.countByUserAndIsReadFalse(user);
    }

    public void markAsRead(Long notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
    }

    public void markAllAsRead(User user) {
        List<Notification> unreadNotifications = notificationRepository.findByUserAndIsReadFalseOrderByCreatedAtDesc(user);
        unreadNotifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(unreadNotifications);
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    // --- Preference Checking Logic ---

    public boolean shouldSendOrderUpdate(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getNotificationPreferences() == null) {
            return true;
        }
        return user.getNotificationPreferences().isOrderUpdates();
    }

    public boolean shouldSendPromotion(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getNotificationPreferences() == null) {
            return true;
        }
        return user.getNotificationPreferences().isPromotions();
    }

    public boolean shouldSendReservationReminder(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getNotificationPreferences() == null) {
            return true;
        }
        return user.getNotificationPreferences().isReservationReminders();
    }

    public boolean shouldSendMenuUpdate(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getNotificationPreferences() == null) {
            return false;
        }
        return user.getNotificationPreferences().isMenuUpdates();
    }

    public boolean shouldSendSpecialEvent(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getNotificationPreferences() == null) {
            return true;
        }
        return user.getNotificationPreferences().isSpecialEvents();
    }

    // --- Combined Notification Dispatch ---

    public void sendNotification(Long userId, String message, Notification.NotificationType type) {
        boolean shouldSend = switch (type) {
            case ORDER_UPDATE -> shouldSendOrderUpdate(userId);
            case PROMOTION -> shouldSendPromotion(userId);
            case RESERVATION_REMINDER -> shouldSendReservationReminder(userId);
            case MENU_UPDATE -> shouldSendMenuUpdate(userId);
            case SPECIAL_EVENT -> shouldSendSpecialEvent(userId);
            default -> true;
        };

        if (shouldSend) {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                createNotification(user, message, type);
                System.out.println("Notification sent: " + type + " to user " + userId);
            }
        } else {
            System.out.println("Notification " + type + " suppressed for user " + userId + " due to preferences");
        }
    }
}
