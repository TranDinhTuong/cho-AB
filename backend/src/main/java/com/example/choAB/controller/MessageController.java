package com.example.choAB.controller;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Category;
import com.example.choAB.model.Message;
import com.example.choAB.request.MessageRequest;
import com.example.choAB.response.ApiResponse;
import com.example.choAB.service.message.IMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {

    private final IMessageService messageService;

    @MessageMapping("/user")
    public void sendUserConversationByUserId(Long userId) {
        messageService.sendUserConversationByUserId(userId);
    }


    @MessageMapping("/conv")
    public void sendMessagesByConversationId(Long conversationId) {
        messageService.sendMessagesByConversationId(conversationId);
    }

    @MessageMapping("/sendMessage")
    public void saveMessage(MessageRequest message) {
        messageService.saveMessage(message);
    }

    @MessageMapping("/deleteConversation")
    public void deleteConversation(Map<String, Object> payload) {
        Long conversationId = (Long) payload.get("conversationId");
        Long user1 = (Long) payload.get("user1Id");
        Long user2 = (Long) payload.get("user2Id");
        messageService.deleteConversationByConversationId(conversationId);
        messageService.sendUserConversationByUserId(user1);
        messageService.sendUserConversationByUserId(user2);
    }

    @MessageMapping("/deleteMessage")
    public void deleteMessage(Map<String, Object> payload) {
        Long conversationId = (Long) payload.get("conversationId");
        Long messageId = (Long) payload.get("messageId");
        messageService.deleteMessageByMessageId(conversationId, messageId);
    }
}
