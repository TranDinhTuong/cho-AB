package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Motel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String area;  // Diện tích
    private Double deposit;  // Tiền cọc

    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;
}
