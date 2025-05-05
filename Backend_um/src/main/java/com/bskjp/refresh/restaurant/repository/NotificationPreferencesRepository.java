package com.bskjp.refresh.restaurant.repository;



import com.bskjp.refresh.restaurant.model.NotificationPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationPreferencesRepository extends JpaRepository<NotificationPreferences, Long> {
    NotificationPreferences findByUserId(Long userId);
}