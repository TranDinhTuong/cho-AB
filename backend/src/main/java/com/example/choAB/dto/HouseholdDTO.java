package com.example.choAB.dto;

import lombok.Data;

@Data
public class HouseholdDTO {
    private Long id;

    private String name;     // Tên sản phẩm (quạt, máy lạnh)
    private String origin;   // Xuất xứ (Nhật Bản)
    private String status;   // Tình trạng (mới, cũ)
}
