package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.StudentTestEnrollment;
import com.example.CarrerLink_backend.entity.StudentTestEnrollment.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing StudentTestEnrollment entities.
 */
@Repository
public interface StudentTestEnrollmentRepository extends JpaRepository<StudentTestEnrollment, Long> {

    /**
     * Finds a student's enrollment for a specific skill test by student ID and skill test ID.
     */
    Optional<StudentTestEnrollment> findByStudentStudentIdAndSkillTestId(Long studentId, Long skillTestId);

    /**
     * Retrieves all enrollments for a given student by their ID.
     */
    List<StudentTestEnrollment> findByStudentStudentId(Long studentId);

    /**
     * Retrieves all enrollments for a given skill test by its ID.
     */
    List<StudentTestEnrollment> findBySkillTestId(Long skillTestId);

    /**
     * Retrieves all enrollments for a student with a specific enrollment status.
     */
    List<StudentTestEnrollment> findByStudentStudentIdAndStatus(Long studentId, EnrollmentStatus status);

    /**
     * Counts the number of enrollments for a specific skill test.
     */
    @Query("SELECT COUNT(e) FROM StudentTestEnrollment e WHERE e.skillTest.id = ?1")
    Long countEnrollmentsByTestId(Long testId);
}