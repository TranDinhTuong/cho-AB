package com.example.choAB.dto;

import com.example.choAB.model.Post;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
public class MotelDTO {
    private Long id;

    private String area;  // Diện tích
    private Double deposit;  // Tiền cọc
}
