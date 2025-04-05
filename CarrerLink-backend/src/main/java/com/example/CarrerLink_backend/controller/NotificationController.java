package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.NotificationRequest;
import com.example.CarrerLink_backend.entity.Notification;
import com.example.CarrerLink_backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private final NotificationService notificationService;

    // Create a new notification
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody NotificationRequest request) {
        Notification notification = notificationService.createNotification(request.getStudentId(), request.getMessage());
        return ResponseEntity.status(HttpStatus.CREATED).body(notification);
    }

    // Retrieve notifications for a student
    @GetMapping("/{studentId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable int studentId) {
        List<Notification> notifications = notificationService.getNotifications(studentId);
        return ResponseEntity.ok(notifications);
    }

    // Mark a notification as read
    @PatchMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        Notification updatedNotification = notificationService.markAsRead(id);
        return ResponseEntity.ok(updatedNotification);
    }

    // Get unread notifications count
    @GetMapping("/{studentId}/unread-count")
    public ResponseEntity<Long> getUnreadCount(@PathVariable int studentId) {
        Long count = notificationService.getUnreadCount(studentId);
        return ResponseEntity.ok(count);
    }
}
