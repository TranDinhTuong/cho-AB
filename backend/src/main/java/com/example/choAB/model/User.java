package com.example.choAB.model;

import com.example.choAB.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

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

    @NaturalId
    private String email;
    private String password;

    private boolean is_priority = false;
    private LocalDateTime last_login;
    private LocalDateTime register_date;

    private String phone;
    private Float rating;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Transaction> transactions = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @JsonIgnore
    @OneToMany(mappedBy = "user_admin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> review_posts;


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_like",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id")
    )
    private List<Post> posts_like;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    @JoinTable(
            name = "user_following", // Tên bảng trung gian
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), // Cột đại diện cho user hiện tại
            inverseJoinColumns = @JoinColumn(name = "following_user_id", referencedColumnName = "id") // Cột đại diện cho người được follow
    )
    private List<User> following;

    // List of users that are following this user
    @ManyToMany(mappedBy = "following", fetch = FetchType.LAZY)
    private List<User> followers;


    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    ) //role it phu thuoc vao user , de neu user bi xoa thi role ko bi xoa theo
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles = new HashSet<>();
}
