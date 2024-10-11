package com.example.choAB.request;

import com.example.choAB.model.Category;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdatePostRequest {
    private String title;
    private String description;
    private BigDecimal price;
    private Category category;
}
