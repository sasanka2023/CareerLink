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
            String token = accessor.getFirstNativeHeader("Authorization");

            if (token == null || !token.startsWith("Bearer ")) {
                throw new AuthenticationCredentialsNotFoundException("Missing or invalid authorization header");
            }

            String jwtToken = token.substring(7);
            Map<String, Object> claims = jwtService.getTokenData(jwtToken);

            if (claims == null) {
                throw new AuthenticationCredentialsNotFoundException("Invalid or expired token");
            }

            String role = (String) claims.get("role");
            if (!"ROLE_STUDENT".equals(role)) {
                throw new AuthenticationCredentialsNotFoundException("Unauthorized role for WebSocket connection");
            }
        }

        return message;
    }
}
