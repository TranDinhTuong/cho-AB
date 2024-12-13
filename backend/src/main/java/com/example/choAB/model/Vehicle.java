package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String manufacturer; // Hãng xe
    private int year;            // Năm sản xuất
    private String fuelType;      // Nhiên liệu
    private String origin;        // Xuất xứ
    private String licensePlate;  // Biển số
    private String color;         // Màu sắc
    private int mileage;          // Số km đã đi được

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public Vehicle(String manufacturer, int year, String fuelType, String origin, String licensePlate, String color, int mileage, Post post) {
        this.manufacturer = manufacturer;
        this.year = year;
        this.fuelType = fuelType;
        this.origin = origin;
        this.licensePlate = licensePlate;
        this.color = color;
        this.mileage = mileage;
        this.post = post;
    }
}
