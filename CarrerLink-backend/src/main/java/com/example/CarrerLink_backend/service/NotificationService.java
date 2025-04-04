package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.entity.Notification;

import java.util.List;

public interface NotificationService {

    public Notification createNotification(int studentId, String message);
    public List<Notification> getNotifications(int studentId);
    public Notification markAsRead(Long id);
    public Long getUnreadCount(int studentId);
}
