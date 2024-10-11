package com.example.choAB.service.notification;

import com.example.choAB.model.Notification;
import com.example.choAB.request.AddNotification;

import java.util.List;

public interface INotificationService {
    Notification addNotification(AddNotification request);
    void deleteNotification(Long id);
    List<Notification> getAllNotifications();

    Notification getNotificationById(Long id);
    List<Notification>  getNotificationByType(String type);
}
