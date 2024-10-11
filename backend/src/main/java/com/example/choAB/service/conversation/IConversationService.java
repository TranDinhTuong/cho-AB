package com.example.choAB.service.conversation;

import com.example.choAB.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IConversationService {
    Conversation getConversationById(Long id);
    List<Conversation> getAllConversations();
    Conversation addConversation(Conversation conversation);
    Conversation updateConversation(Conversation conversation, Long id);
    void deleteConversationById(Long id);
}
