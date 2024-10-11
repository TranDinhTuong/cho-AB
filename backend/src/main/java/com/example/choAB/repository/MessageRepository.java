package com.example.choAB.repository;

import com.example.choAB.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationId(Long id);
}
