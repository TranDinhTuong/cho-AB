package com.example.choAB.repository;

import com.example.choAB.model.Category;
import com.example.choAB.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

}
