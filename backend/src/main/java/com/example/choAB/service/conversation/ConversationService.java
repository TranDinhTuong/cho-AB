package com.example.choAB.service.conversation;

import com.example.choAB.dto.ConversationDTO;
import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Conversation;
import com.example.choAB.model.User;
import com.example.choAB.repository.ConversationRepository;
import com.example.choAB.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationService implements IConversationService {
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    @Override
    public Conversation addConversation(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + user1Id));
        User user2 = userRepository.findById(user2Id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + user2Id));

        Conversation conversation = new Conversation();
        conversation.setUser1(user1);
        conversation.setUser2(user2);
        return conversationRepository.save(conversation);
    }

    @Override
    public Conversation updateConversation(Conversation conversation, Long id) {
        return null;
    }

    @Override
    public void deleteConversationById(Long id) {

    }

    @Override
    public ConversationDTO convertToConversationDTO(Conversation conversation) {
        return modelMapper.map(conversation, ConversationDTO.class);
    }
}
