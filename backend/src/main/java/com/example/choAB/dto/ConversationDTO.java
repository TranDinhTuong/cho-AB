package com.example.choAB.dto;

import com.example.choAB.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class ConversationDTO {

    private Long id;

    private UserDto user1;

    private UserDto user2;
}
