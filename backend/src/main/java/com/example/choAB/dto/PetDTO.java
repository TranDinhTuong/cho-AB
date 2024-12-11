package com.example.choAB.dto;

import lombok.Data;

@Data
public class PetDTO {
    private Long id;

    private String name;     // Giống thú cưng (Chó Chihuahua)
    private Integer age;     // Tuổi của thú cưng
    private String size;     // Kích cỡ (nhỏ, vừa, lớn)
}
