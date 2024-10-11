package com.example.choAB.service.conversation;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Conversation;
import com.example.choAB.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService implements IConversationService {
    private final ConversationRepository conversationRepository;

    @Override
    public Conversation getConversationById(Long id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation Not Found"));
    }

    @Override
    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    @Override
    public Conversation addConversation(Conversation conversation) {
        return null;
    }

    @Override
    public Conversation updateConversation(Conversation conversation, Long id) {
        return null;
    }

    @Override
    public void deleteConversationById(Long id) {

    }
}
