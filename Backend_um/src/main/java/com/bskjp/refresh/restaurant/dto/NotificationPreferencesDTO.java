package com.bskjp.refresh.restaurant.dto;



import lombok.Data;

@Data
public class NotificationPreferencesDTO {
    private boolean orderUpdates = true;
    private boolean promotions = true;
    private boolean reservationReminders = true;
    private boolean menuUpdates = false;
    private boolean specialEvents = true;
}