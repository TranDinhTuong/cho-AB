package com.example.choAB.service.notification;

import com.example.choAB.dto.NotificationDTO;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Notification;
import com.example.choAB.model.User;
import com.example.choAB.repository.NotificationRepository;
import com.example.choAB.repository.UserRepository;
import com.example.choAB.request.AddNotification;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NotificationService implements INotificationService{
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    @Override
    public Notification addNotification(AddNotification request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        Notification notification = new Notification();
        notification.setType(request.getType());
        notification.setContent(request.getContent());
        notification.setCreate_at(LocalDateTime.now());
        notification.setUser(user);
        return notificationRepository.save(notification);
    }

    @Override
    public NotificationDTO convertToDTO(Notification notification) {
        return modelMapper.map(notification, NotificationDTO.class);
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
    public List<Notification> getAllNotifications(Long userId) {
        return notificationRepository.findByUserId(userId);
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
