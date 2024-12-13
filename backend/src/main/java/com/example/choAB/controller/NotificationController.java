package com.example.choAB.controller;

import com.example.choAB.dto.NotificationDTO;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.Notification;
import com.example.choAB.request.AddNotification;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.notification.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {
    private final INotificationService notificationService;

    @PostMapping("/{userId}/add")
    public ResponseEntity<ApiResponse> addNotification(@RequestBody AddNotification request, @PathVariable Long userId){
        try {
            Notification notification = notificationService.addNotification(request, userId);
            NotificationDTO notificationDTO = notificationService.convertToDTO(notification);
            return ResponseEntity.ok(new ApiResponse("Success", notificationDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("Failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/{userId}/all")
    public ResponseEntity<ApiResponse> getAllNotification(@PathVariable Long userId){
        try {
            List<Notification> notifications = notificationService.getAllNotifications(userId);
            List<NotificationDTO> notificationDTOs = notifications.stream().map(e -> notificationService.convertToDTO(e)).toList();
            if(notificationDTOs.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Success", "NOT FOUND"));
            }
            return ResponseEntity.ok(new ApiResponse("Success", notificationDTOs));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed: " + e.getMessage(), null));
        }
    }
    @GetMapping("/notification/{id}")
    public ResponseEntity<ApiResponse> getNotificationById(@PathVariable Long id){
        try {
            Notification notification = notificationService.getNotificationById(id);
            return ResponseEntity.ok(new ApiResponse("Success", notification));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/notification/{type}/notification")
    public ResponseEntity<ApiResponse> getNotificationById(@PathVariable String type){
        try {
            List<Notification> notifications = notificationService.getNotificationByType(type);
            if(notifications.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Failed", "NOT FOUND"));
            }
            return ResponseEntity.ok(new ApiResponse("Success", notifications));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/notification/{id}/delete")
    public ResponseEntity<ApiResponse> deleteNotification(@PathVariable Long id){
        try {
            notificationService.deleteNotification(id);
            return ResponseEntity.ok(new ApiResponse("Success", null));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed: " + e.getMessage(), null));
        }
    }


}
