package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.entity.Notification;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.repo.NotificationRepo;
import com.example.CarrerLink_backend.repo.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepo notificationRepo;
    private final StudentRepo studentRepo;

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        List<Notification> notifications = notificationRepo.findByStudentOrderByCreatedAtDesc(student);
        return ResponseEntity.ok(notifications);
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable int id) {
        Notification notification = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        return ResponseEntity.ok(notificationRepo.save(notification));
    }

    @GetMapping("/{studentId}/unread-count")
    public ResponseEntity<Long> getUnreadNotificationCount(@PathVariable int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        long count = notificationRepo.findByStudentOrderByCreatedAtDesc(student)
                .stream()
                .filter(n -> !n.isRead())
                .count();
        return ResponseEntity.ok(count);
    }
}