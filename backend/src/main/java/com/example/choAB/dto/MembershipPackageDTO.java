package com.example.choAB.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MembershipPackageDTO {
    private Long id;
    private String name; // tên gói
    private String description; // mô tả
    private String time; //thời gian sử dụng
    private BigDecimal price; // giá
}
