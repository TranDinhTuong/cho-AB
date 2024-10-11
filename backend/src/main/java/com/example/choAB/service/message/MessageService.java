package com.example.choAB.service.message;

import com.example.choAB.exception.ResourceNotFoundException;
import com.example.choAB.model.Message;
import com.example.choAB.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService{
    private final MessageRepository messageRepository;
    @Override
    public Message getMessageById(Long id) {
        return messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found!"));
    }

    @Override
    public List<Message> getMessageByConversationId(Long conversationId) {
        return messageRepository.findByConversationId(conversationId);
    }

    @Override
    public Message addMessage(Message request) {
        Message message = new Message();
        message.setContent(request.getContent());
        message.setSend_time(LocalDateTime.now());

        return messageRepository.save(message);
    }

    @Override
    public Message updateMessage(Message request, Long id) {
        return null;
    }

    @Override
    public void deleteMessageById(Long id) {

    }
}
