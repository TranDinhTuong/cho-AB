package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Phone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String condition;  // Tình trạng (Mới, Đã sử dụng, v.v.)
    private String brand;      // Hãng (Apple, Samsung, Xiaomi, v.v.)
    private String model;      // Dòng máy (iPhone 13, Galaxy S22, v.v.)
    private String origin;     // Xuất xứ (Chính hãng, Xách tay, v.v.)
    private String color;      // Màu sắc (Đen, Trắng, Xanh, v.v.)
    private String storage;    // Dung lượng (128GB, 256GB, v.v.)

    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;

    public Phone(String condition, String brand, String model, String origin, String color, String storage) {
        this.condition = condition;
        this.brand = brand;
        this.model = model;
        this.origin = origin;
        this.color = color;
        this.storage = storage;
    }
}
