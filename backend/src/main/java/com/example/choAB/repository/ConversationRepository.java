package com.example.choAB.repository;

import com.example.choAB.model.Conversation;
import com.example.choAB.model.User;
import com.example.choAB.response.ConversationResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("SELECT c FROM Conversation c WHERE (c.user1 = :user1 AND c.user2 = :user2) OR (c.user1 = :user2 AND c.user2 = :user1)")
    Optional<Conversation> findConversationByUsers(@Param("user1") User user1, @Param("user2") User user2);

    @Query(
            nativeQuery = true,
            value = """
                    SELECT
                        C.id AS conversationId,
                        U.id AS otherUserId,
                        U.name AS otherUserName,
                        M.content AS lastMessage,
                        M.timestamp AS lastMessageTimestamp
                    FROM conversation AS C
                                                
                    INNER JOIN user AS U
                    ON (C.user1_id = U.id OR C.user2_id = U.id) AND U.id != ?1
                                                
                    LEFT JOIN (
                        SELECT
                            conversation_id,
                            (SELECT content FROM message M2 WHERE M2.conversation_id = M.conversation_id ORDER BY M2.timestamp DESC LIMIT 1) AS content,
                            MAX(timestamp) AS timestamp
                        FROM message M
                        GROUP BY conversation_id
                    ) AS M
                    ON C.id = M.conversation_id
                                                
                    WHERE C.user1_id = ?1 OR C.user2_id = ?1
                    ORDER BY M.timestamp DESC;  
                    """
    )
    List<ConversationResponse> findConversationsByUserId(Long userId);

    @Query("SELECT DISTINCT CASE WHEN c.user1.id = :userId THEN c.user2 ELSE c.user1 END " +
            "FROM Conversation c " +
            "WHERE :userId IN (c.user1.id, c.user2.id)")
    List<User> findUsersInConversationsByUserId(@Param("userId") Long userId);
}
