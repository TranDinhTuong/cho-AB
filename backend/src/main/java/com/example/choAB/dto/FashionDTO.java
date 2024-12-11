package com.example.choAB.dto;

import lombok.Data;

@Data
public class FashionDTO {
    private Long id;

    private String name;     // Tên sản phẩm (quần short, áo len)
    private String type;     // Loại sản phẩm (nam, nữ)
    private String status;   // Tình trạng (mới, cũ)
}
