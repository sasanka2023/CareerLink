package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.entity.Notification;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.repo.NotificationRepo;
import com.example.CarrerLink_backend.repo.StudentRepo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class NotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final NotificationRepo notificationRepo;
    private final StudentRepo studentRepo;


    public void sendNotification(String studentId,Notification notification){
        Student student = studentRepo.findById(Integer.parseInt(studentId)).orElseThrow(() -> new RuntimeException("Student not found"));
        notification.setStudent(student);
        notification.setCreatedAt(LocalDateTime.now());
        Notification savedNotification = notificationRepo.save(notification);

        simpMessagingTemplate.convertAndSendToUser(
                studentId,
                "queue/notifications",
                savedNotification
        );
    }
}
