package com.example.choAB.dto;

import lombok.Data;

@Data
public class BookDTO {
    private Long id;

    private String name;      // Tên sách (Mắt biếc)
    private String origin;    // Nhà xuất bản (Kim Đồng)
    private String type;      // Loại sản phẩm (trinh thám, trẻ em)
    private Integer year;     // Năm xuất bản
    private String status;    // Tình trạng (mới, cũ)
}
