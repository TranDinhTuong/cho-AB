package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String address;
    private boolean is_verified;
    private LocalDateTime last_login;
    private LocalDateTime register_date;
    private Float rating;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Transaction> transactions = new HashSet<>();

    //upload
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    //reviews
    @OneToMany(mappedBy = "user_admin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> review_posts;



    @ManyToMany
    @JoinTable(
            name = "user_like",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id")
    )
    private List<Post> posts_like;

    @ManyToMany
    @JoinTable(
            name = "user_following", // Tên bảng trung gian
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), // Cột đại diện cho user hiện tại
            inverseJoinColumns = @JoinColumn(name = "following_user_id", referencedColumnName = "id") // Cột đại diện cho người được follow
    )
    private List<User> following;

    // List of users that are following this user
    @ManyToMany(mappedBy = "following")
    private List<User> followers;

    @ManyToMany
    @JoinTable(
            name = "conversation_participants", // Tên bảng trung gian
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), // Khoá ngoại trỏ tới bảng Users
            inverseJoinColumns = @JoinColumn(name = "conversation_id", referencedColumnName = "id") // Khoá ngoại trỏ tới bảng Conversations
    )
    private Set<Conversation> conversations = new HashSet<>();
}
