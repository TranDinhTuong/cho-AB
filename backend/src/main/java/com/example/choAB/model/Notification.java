package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String content;
    private boolean is_read = false;
    private LocalDateTime create_at;

    @ManyToOne
    @JoinColumn(name = "user_Id")
    private User user;
}
