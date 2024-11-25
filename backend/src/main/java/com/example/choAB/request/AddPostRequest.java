package com.example.choAB.request;

import com.example.choAB.model.Category;
import com.example.choAB.model.Vehicle;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AddPostRequest {

    private String title;
    private String description;
    private BigDecimal price;
    private String location;
    private Category category;
    private Vehicle vehicle;
}
