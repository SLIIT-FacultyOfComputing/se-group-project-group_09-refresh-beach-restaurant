package com.bskjp.refresh.restaurant.service;



import com.bskjp.refresh.restaurant.dto.NotificationPreferencesDTO;
import com.bskjp.refresh.restaurant.model.NotificationPreferences;
import com.bskjp.refresh.restaurant.model.User;
import com.bskjp.refresh.restaurant.repository.NotificationPreferencesRepository;
import com.bskjp.refresh.restaurant.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationPreferencesService {

    @Autowired
    private NotificationPreferencesRepository notificationPreferencesRepository;

    @Autowired
    private UserRepository userRepository;

    public NotificationPreferencesDTO getNotificationPreferences(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        NotificationPreferences preferences = user.getNotificationPreferences();
        if (preferences == null) {
            // Create default preferences if none exist
            preferences = new NotificationPreferences();
            user.setNotificationPreferences(preferences);
            userRepository.save(user);
        }

        return convertToDTO(preferences);
    }

    @Transactional
    public void updateNotificationPreferences(Long userId, NotificationPreferencesDTO preferencesDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        NotificationPreferences preferences = user.getNotificationPreferences();
        if (preferences == null) {
            preferences = new NotificationPreferences();
            user.setNotificationPreferences(preferences);
        }

        // Update preferences
        preferences.setOrderUpdates(preferencesDTO.isOrderUpdates());
        preferences.setPromotions(preferencesDTO.isPromotions());
        preferences.setReservationReminders(preferencesDTO.isReservationReminders());
        preferences.setMenuUpdates(preferencesDTO.isMenuUpdates());
        preferences.setSpecialEvents(preferencesDTO.isSpecialEvents());

        userRepository.save(user);
    }

    private NotificationPreferencesDTO convertToDTO(NotificationPreferences preferences) {
        NotificationPreferencesDTO dto = new NotificationPreferencesDTO();
        dto.setOrderUpdates(preferences.isOrderUpdates());
        dto.setPromotions(preferences.isPromotions());
        dto.setReservationReminders(preferences.isReservationReminders());
        dto.setMenuUpdates(preferences.isMenuUpdates());
        dto.setSpecialEvents(preferences.isSpecialEvents());
        return dto;
    }
}