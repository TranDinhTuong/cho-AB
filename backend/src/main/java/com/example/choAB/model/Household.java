package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Household {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;     // Tên sản phẩm (quạt, máy lạnh)
    private String origin;   // Xuất xứ (Nhật Bản)
    private String status;   // Tình trạng (mới, cũ)

    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;
}