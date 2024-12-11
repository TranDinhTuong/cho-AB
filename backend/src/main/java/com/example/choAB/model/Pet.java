package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;     // Giống thú cưng (Chó Chihuahua)
    private Integer age;     // Tuổi của thú cưng
    private String size;     // Kích cỡ (nhỏ, vừa, lớn)

    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;

    public Pet(String name, Integer age, String size, Post post) {
        this.name = name;
        this.age = age;
        this.size = size;
        this.post = post;
    }
}