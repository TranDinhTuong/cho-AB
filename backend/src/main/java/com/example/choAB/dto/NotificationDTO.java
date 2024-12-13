package com.example.choAB.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long id;
    private String type;
    private String content;
    private boolean is_read = false;
    private LocalDateTime create_at;
    private UserDto user;
}
