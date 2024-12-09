package com.example.choAB.dto;

import lombok.Data;

@Data
public class PhoneDTO {
    private Long id;

    private String condition;  // Tình trạng (Mới, Đã sử dụng, v.v.)
    private String brand;      // Hãng (Apple, Samsung, Xiaomi, v.v.)
    private String model;      // Dòng máy (iPhone 13, Galaxy S22, v.v.)
    private String origin;     // Xuất xứ (Chính hãng, Xách tay, v.v.)
    private String color;      // Màu sắc (Đen, Trắng, Xanh, v.v.)
    private String storage;    // Dung lượng (128GB, 256GB, v.v.)
}
