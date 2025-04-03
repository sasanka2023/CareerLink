package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Notification;
import com.example.CarrerLink_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Integer> {

  List<Notification> findByStudentOrderByCreatedAtDesc(Student student);
}
