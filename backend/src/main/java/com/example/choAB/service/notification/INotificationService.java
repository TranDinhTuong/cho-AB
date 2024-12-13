package com.example.choAB.service.notification;

import com.example.choAB.dto.NotificationDTO;
import com.example.choAB.model.Notification;
import com.example.choAB.request.AddNotification;

import java.util.List;

public interface INotificationService {
    Notification addNotification(AddNotification request, Long userId);
    void deleteNotification(Long id);
    List<Notification> getAllNotifications(Long userId);

    Notification getNotificationById(Long id);
    List<Notification>  getNotificationByType(String type);

    NotificationDTO convertToDTO(Notification notification);
}
