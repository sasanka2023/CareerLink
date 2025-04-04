package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.entity.Notification;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.repo.NotificationRepository;
import com.example.CarrerLink_backend.repo.StudentRepo;
import com.example.CarrerLink_backend.repo.UserRepo;
import com.example.CarrerLink_backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final StudentRepo studentRepo;

    @Override
    public Notification createNotification(int studentId, String message) {
        Notification notification = new Notification();
        notification.setStudentId(studentId);
        notification.setMessage(message);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setRead(false);

        Notification savedNotification = notificationRepository.save(notification);
        // Send notification via WebSocket
        messagingTemplate.convertAndSendToUser(
                String.valueOf(studentId),
                "/queue/notifications",
                savedNotification
        );
        return savedNotification;
    }

    @Override
    public List<Notification> getNotifications(int studentId) {
        Student student = studentRepo.findByUser_Id(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        return notificationRepository.findByStudentIdOrderByCreatedAtDesc(student.getStudentId());
    }

    @Override
    public Notification markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    @Override
    public Long getUnreadCount(int studentId) {
        Student student = studentRepo.findByUser_Id(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        return notificationRepository.countByStudentIdAndIsReadFalse(student.getStudentId());
    }
}
