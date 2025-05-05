package com.bskjp.refresh.restaurant.controller;

import com.bskjp.refresh.restaurant.dto.NotificationPreferencesDTO;
import com.bskjp.refresh.restaurant.service.NotificationPreferencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationPreferencesController {

    @Autowired
    private NotificationPreferencesService notificationPreferencesService;

    @GetMapping("/{userId}")
    public ResponseEntity<NotificationPreferencesDTO> getNotificationPreferences(@PathVariable Long userId) {
        NotificationPreferencesDTO preferences = notificationPreferencesService.getNotificationPreferences(userId);
        return ResponseEntity.ok(preferences);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateNotificationPreferences(
            @PathVariable Long userId,
            @RequestBody NotificationPreferencesDTO preferencesDTO) {
        try {
            notificationPreferencesService.updateNotificationPreferences(userId, preferencesDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}