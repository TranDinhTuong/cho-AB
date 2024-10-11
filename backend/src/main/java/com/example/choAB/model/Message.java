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
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime send_time;
    private boolean is_read = false;

    @ManyToOne()
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;
}
