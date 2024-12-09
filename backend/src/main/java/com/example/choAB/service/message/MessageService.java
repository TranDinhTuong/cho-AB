package com.example.choAB.service.message;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Conversation;
import com.example.choAB.model.Message;
import com.example.choAB.model.User;
import com.example.choAB.repository.ConversationRepository;
import com.example.choAB.repository.MessageRepository;
import com.example.choAB.repository.UserRepository;
import com.example.choAB.request.MessageRequest;
import com.example.choAB.response.ConversationResponse;
import com.example.choAB.response.MessageResponse;
import com.example.choAB.response.WebSocketResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.sql.Date;
import java.time.ZoneId;


@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService{
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;


    @Override
    public void sendUserConversationByUserId(Long userId) {
        List<ConversationResponse> conversation = conversationRepository.findConversationsByUserId(userId);
        messagingTemplate.convertAndSend(
                "/topic/user/".concat(String.valueOf(userId)),
                WebSocketResponse.builder()
                        .type("ALL")
                        .data(conversation)
                        .build()
        );
    }

    @Override
    public void sendMessagesByConversationId(Long conversationId) {
        Conversation conversation = new Conversation();
        conversation.setId(conversationId);
        List<Message> messageList = messageRepository.findAllByConversation(conversation);
        List<MessageResponse> messageResponseList = messageList.stream()
                .map((message -> MessageResponse.builder()
                        .messageId(message.getId())
                        .message(message.getContent())
                        .timestamp(Date.from(message.getTimeStamp().atZone(ZoneId.systemDefault()).toInstant()))
                        .senderId(message.getSender().getId())
                        .receiverId(message.getReceiver().getId())
                        .build())
                ).toList();
        messagingTemplate.convertAndSend("/topic/conv/".concat(String.valueOf(conversationId)), WebSocketResponse.builder()
                .type("ALL")
                .data(messageResponseList)
                .build()
        );
    }

    @Override
    public void saveMessage(MessageRequest msg) {
        User sender = userRepository.findById(msg.getSenderId()).get();
        User receiver = userRepository.findById(msg.getReceiverId()).get();
        Conversation conversation = conversationRepository.findConversationByUsers(sender, receiver).get();
        Message newMessage = new Message();
        newMessage.setContent(msg.getMessage());
        newMessage.setTimeStamp(msg.getTimestamp());
        newMessage.setConversation(conversation);
        newMessage.setSender(sender);
        newMessage.setReceiver(receiver);
        Message savedMessage = messageRepository.save(newMessage);
        // notify listener
        MessageResponse res = MessageResponse.builder()
                .messageId(savedMessage.getId())
                .message(savedMessage.getContent())
                .timestamp(Date.from(savedMessage.getTimeStamp().atZone(ZoneId.systemDefault()).toInstant()))
                .senderId(savedMessage.getSender().getId())
                .receiverId(savedMessage.getReceiver().getId())
                .build();
        messagingTemplate.convertAndSend("/topic/conv/".concat(msg.getConversationId().toString()),
                WebSocketResponse.builder()
                        .type("ADDED")
                        .data(res)
                        .build()
        );
        sendUserConversationByUserId(msg.getSenderId());
        sendUserConversationByUserId(msg.getReceiverId());
    }

    @Override
    public void deleteConversationByConversationId(Long conversationId) {
        Conversation c = new Conversation();
        c.setId(conversationId);
        messageRepository.deleteAllByConversation(c);
        conversationRepository.deleteById(conversationId);
    }

    @Override
    public void deleteMessageByMessageId(Long conversationId, Long messageId) {
        messageRepository.deleteById(messageId);
        // notify listener
        sendMessagesByConversationId(conversationId);
    }


}
