package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String last_message;
    private LocalDateTime last_message_time;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Message> messages;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToMany(mappedBy = "conversations")
    private Set<User> user = new HashSet<>();
}
