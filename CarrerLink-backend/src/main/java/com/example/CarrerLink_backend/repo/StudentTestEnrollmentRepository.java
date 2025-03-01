package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.StudentTestEnrollment;
import com.example.CarrerLink_backend.entity.StudentTestEnrollment.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentTestEnrollmentRepository extends JpaRepository<StudentTestEnrollment, Long> {

    Optional<StudentTestEnrollment> findByStudentIdAndSkillTestId(Long studentId, Long skillTestId);

    List<StudentTestEnrollment> findByStudentId(Long studentId);

    List<StudentTestEnrollment> findBySkillTestId(Long skillTestId);

    List<StudentTestEnrollment> findByStudentIdAndStatus(Long studentId, EnrollmentStatus status);

    @Query("SELECT COUNT(e) FROM StudentTestEnrollment e WHERE e.skillTest.id = ?1")
    Long countEnrollmentsByTestId(Long testId);
}
