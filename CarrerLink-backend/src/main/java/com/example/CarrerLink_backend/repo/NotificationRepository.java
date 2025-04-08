package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Notification;
import com.example.CarrerLink_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface NotificationRepository extends JpaRepository<Notification, Long> {

  List<Notification> findByStudentIdOrderByCreatedAtDesc(int studentId);
  Long countByStudentIdAndIsReadFalse(int studentId);

//  Long countByReadFalse();
}
