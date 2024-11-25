package com.example.choAB.dto;

import lombok.Data;

@Data
public class VehicleDTO {
    private String manufacturer; // Hãng xe
    private int year;            // Năm sản xuất
    private String fuelType;      // Nhiên liệu
    private String origin;        // Xuất xứ
    private String licensePlate;  // Biển số
    private String color;         // Màu sắc
    private int mileage;          // Số km đã đi được
}
