package com.example.choAB.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;      // Tên sách (Mắt biếc)
    private String origin;    // Nhà xuất bản (Kim Đồng)
    private String type;      // Loại sản phẩm (trinh thám, trẻ em)
    private Integer year;     // Năm xuất bản
    private String status;    // Tình trạng (mới, cũ)

    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;
}
