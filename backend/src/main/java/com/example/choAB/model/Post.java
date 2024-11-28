package com.example.choAB.model;

import com.example.choAB.enums.PostStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private BigDecimal price;
    private LocalDateTime post_date;
    private String location;

    @Enumerated(EnumType.STRING)
    private PostStatus status ;

    private boolean is_priority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_admin_id")
    private User user_admin;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Conversation> conversations;

    @ManyToMany(mappedBy = "posts_like")
    private List<User> users_like;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    @OneToOne(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Vehicle vehicle;

    public Post(String title, String description, BigDecimal price, LocalDateTime post_date,String location ,boolean is_priority, Category category, User user, PostStatus status) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.post_date = post_date;
        this.is_priority = is_priority;
        this.location = location;
        this.category = category;
        this.user = user;
        this.status = status;
    }

}
