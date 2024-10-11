package com.example.choAB.request;

import com.example.choAB.model.Category;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AddPostRequest {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private Category category;
}
