package com.example.choAB.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddNotification {
    private Long id;
    private String type;
    private String content;
}
