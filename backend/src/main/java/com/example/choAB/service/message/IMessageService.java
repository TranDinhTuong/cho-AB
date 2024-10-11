package com.example.choAB.service.message;

import com.example.choAB.model.Category;
import com.example.choAB.model.Message;

import java.util.List;

public interface IMessageService {
    Message getMessageById(Long id);
    List<Message> getMessageByConversationId(Long conversationId);
    Message addMessage(Message request);
    Message updateMessage(Message request, Long id);
    void deleteMessageById(Long id);
}
