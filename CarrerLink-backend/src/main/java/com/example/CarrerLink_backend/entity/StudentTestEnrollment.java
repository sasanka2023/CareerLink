package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "student_test_enrollments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentTestEnrollment {

    public enum EnrollmentStatus {
        ENROLLED,
        IN_PROGRESS,
        COMPLETED,
        EVALUATED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "skill_test_id", nullable = false)
    private SkillTest skillTest;

    @Column(nullable = false)
    private LocalDateTime enrollmentDate;

    private LocalDateTime startTime;

    private LocalDateTime completionTime;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

    private Integer obtainedMarks;

    @OneToMany(mappedBy = "enrollment", cascade = CascadeType.ALL)
    private List<StudentAnswer> answers;
}
