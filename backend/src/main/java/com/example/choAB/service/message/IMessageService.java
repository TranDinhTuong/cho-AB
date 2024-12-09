package com.example.choAB.service.message;

import com.example.choAB.model.Category;
import com.example.choAB.model.Message;
import com.example.choAB.request.MessageRequest;

import java.util.List;

public interface IMessageService {

    void sendUserConversationByUserId(Long userId);

    void sendMessagesByConversationId(Long conversationId);

    void saveMessage(MessageRequest msg);

    void deleteConversationByConversationId(Long conversationId);

    void deleteMessageByMessageId(Long conversationId, Long messageId);
}
