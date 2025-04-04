package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {

    List<StudentAnswer> findByEnrollmentId(Long enrollmentId);

    Optional<StudentAnswer> findByEnrollmentIdAndQuestionId(Long enrollmentId, Long questionId);
}
