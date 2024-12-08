package com.example.choAB.security.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {


    @EventListener
    private void handleSessionConnected(SessionConnectEvent event) {
        System.out.println("A client connected");
    }

    @EventListener
    private void handleSessionDisconnect(SessionDisconnectEvent event) {
        System.out.println("A client disconnected");
    }

    @EventListener
    private void handleSessionSubscribe(SessionSubscribeEvent event) {
        System.out.println("A client Subscribe");
    }

    @EventListener
    private void handleSessionUnsubscribe(SessionUnsubscribeEvent event) {
        System.out.println("A client Unsubscribe");
    }
}
