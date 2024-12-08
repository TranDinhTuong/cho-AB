package com.example.choAB.service.conversation;

import com.example.choAB.model.Conversation;

import java.util.List;

public interface IConversationService {
    List<Conversation> getAllConversations();
    Conversation addConversation(Conversation conversation);
    Conversation updateConversation(Conversation conversation, Long id);
    void deleteConversationById(Long id);


}
