package com.example.choAB.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;

    private boolean is_verified;
    private LocalDateTime last_login;
    private LocalDateTime register_date;
    private Float rating;

    private List<RoleDTO> roles;
}
