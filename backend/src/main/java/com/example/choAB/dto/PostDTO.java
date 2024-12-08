package com.example.choAB.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PostDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private LocalDateTime post_date;
    private String location;
    private boolean is_priority;
    private String status;
    private String category;
    private VehicleDTO vehicle;

    private UserDto user;
    private JobDTO job;
    private PhoneDTO phone;
}
