package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Notification;
import com.example.CarrerLink_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

  List<Notification> findByStudentIdOrderByCreatedAtDesc(int studentId);
  Long countByStudentIdAndIsReadFalse(int studentId);

}
