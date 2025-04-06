package com.example.CarrerLink_backend.config;

import com.example.CarrerLink_backend.service.impl.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.Value;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor {
    private final JWTService jwtService;

    public WebSocketAuthInterceptor(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String tokenHeader = accessor.getFirstNativeHeader("Authorization");

            if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
                throw new AuthenticationCredentialsNotFoundException("Missing authorization token");
            }

            String token = tokenHeader.substring(7);
            Claims claims = jwtService.getTokenData(token);

            if (claims == null) {
                throw new AuthenticationCredentialsNotFoundException("Invalid or expired token");
            }

            // Optional: Add basic username verification
            String username = jwtService.getUsername(token);
            if (username == null) {
                throw new AuthenticationCredentialsNotFoundException("Invalid token payload");
            }
        }

        return message;
    }
}
