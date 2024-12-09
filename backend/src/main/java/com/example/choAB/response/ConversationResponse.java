package com.example.choAB.response;
import java.sql.Timestamp;
public interface ConversationResponse {
    Long getConversationId();

    Long getOtherUserId();

    String getOtherUserName();

    String getLastMessage();

    Timestamp getLastMessageTimestamp();
}
