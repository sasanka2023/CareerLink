package com.example.CarrerLink_backend.config;

import com.example.CarrerLink_backend.entity.Notification;
import com.example.CarrerLink_backend.repo.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
public class CompanyEventHandler {

    private final SimpMessagingTemplate messagingTemplate;


    private final NotificationRepository notificationRepository;

    @EventListener
    public void handleCompanyRegistered(CompanyRegisteredEvent event) {
//        Notification notification = new Notification();
//        notification.setMessage("New company registered: " + event.getCompany().getName());
//        notification.setCreatedAt(LocalDateTime.now());
//        notification.setRead(false);
//        notificationRepository.save(notification);
//
//        // Send via WebSocket
//        messagingTemplate.convertAndSend("/topic/admin/notifications",
//                Map.of(
//                        "count", notificationRepository.countByReadFalse(),
//                        "message", notification.getMessage()
//                ));
    }
}
