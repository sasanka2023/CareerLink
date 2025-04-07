// EnrollmentRepository.java
package com.example.CarrerLink_backend.repository;

import com.example.CarrerLink_backend.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(Long studentId);
}