package com.example.choAB.request;

import com.example.choAB.model.*;
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
    private Job job;
    private Phone phone;
    private Motel motel;
    private Household household;
    private Pet pet;
    private Fashion fashion;
    private Book book;
}
