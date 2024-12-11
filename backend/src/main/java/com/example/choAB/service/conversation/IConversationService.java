package com.example.choAB.service.conversation;

import com.example.choAB.dto.ConversationDTO;
import com.example.choAB.model.Conversation;

import java.util.List;

public interface IConversationService {
    List<Conversation> getAllConversations();

    Conversation addConversation(Long user1Id, Long user2Id);

    Conversation updateConversation(Conversation conversation, Long id);
    void deleteConversationById(Long id);

    ConversationDTO convertToConversationDTO(Conversation conversation);

}
