package com.example.choAB.controller;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.Message;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.message.IMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {

    private final IMessageService messageService;

    @GetMapping("/{id}/message")
    public ResponseEntity<ApiResponse> getMessageById(@PathVariable Long id){
        try {
            Message message = messageService.getMessageById(id);
            return ResponseEntity.ok(new ApiResponse("Success!", message));
        }catch (ResourceNotFoundException e){
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error:", e.getMessage()));
        }
    }

    @GetMapping("message/{conversationId}/all")
    public ResponseEntity<ApiResponse> getMessageByConversationId(@PathVariable Long conversationId){
        try {
            List<Message> message = messageService.getMessageByConversationId(conversationId);
            if(message.isEmpty()){
                return ResponseEntity.ok(new ApiResponse("Success!", "Empty"));
            }
            return ResponseEntity.ok(new ApiResponse("Success!", message));
        }catch (Exception e){
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Error:", e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addCategory(@RequestBody Message request){
        try {
            Message message = messageService.addMessage(request);
            return ResponseEntity.ok(new ApiResponse("Success", message));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse("Failed: " + e.getMessage(), null));
        }
    }
}
