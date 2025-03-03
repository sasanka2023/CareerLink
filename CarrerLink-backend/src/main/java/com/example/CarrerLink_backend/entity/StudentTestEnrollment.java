package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "student_test_enrollments")
@Data
public class StudentTestEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "skill_test_id")
    private SkillTest skillTest;

    // Other fields (enrollmentDate, status, etc.)
    private LocalDateTime enrollmentDate;

    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

    public void setStartTime(LocalDateTime now) {
    }

    public void setCompletionTime(LocalDateTime now) {
    }

    public void setObtainedMarks(int totalMarks) {
    }

    public enum EnrollmentStatus {
        ENROLLED, IN_PROGRESS, COMPLETED, EVALUATED
    }
}