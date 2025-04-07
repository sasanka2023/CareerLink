// SubmissionRepository.java
package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    Optional<Submission> findByStudentIdAndTestId(Long studentId, Long testId);
}