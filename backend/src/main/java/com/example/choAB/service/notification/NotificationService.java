package com.example.choAB.service.notification;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Notification;
import com.example.choAB.repository.NotificationRepository;
import com.example.choAB.request.AddNotification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationService implements INotificationService{
    private final NotificationRepository notificationRepository;

    @Override
    public Notification addNotification(AddNotification request) {
        Notification notification = new Notification();
        notification.setType(request.getType());
        notification.setContent(request.getContent());
        notification.setCreate_at(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    @Override
    public void deleteNotification(Long id) {
        notificationRepository.findById(id)
                .ifPresentOrElse(
                        notificationRepository::delete,
                        () -> new ResourceNotFoundException("Notification not found!")
                );
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found!"));
    }

    @Override
    public List<Notification> getNotificationByType(String type) {
        return notificationRepository.findByType(type);
    }
}
