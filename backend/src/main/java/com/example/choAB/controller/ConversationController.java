package com.example.choAB.controller;

import com.example.choAB.dto.ConversationDTO;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Conversation;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.conversation.IConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/conversations")
public class ConversationController {

    private final IConversationService conversationService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addConversation(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        try{
            Conversation conversation = conversationService.addConversation(user1Id, user2Id);
            ConversationDTO conversationDTO = conversationService.convertToConversationDTO(conversation);
            return ResponseEntity.ok(new ApiResponse("Success", conversationDTO));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }
}
