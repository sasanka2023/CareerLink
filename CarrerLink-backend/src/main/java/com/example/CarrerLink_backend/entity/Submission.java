// Submission.java
package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import java.util.Map;

@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "test_id", nullable = false)
    private Long testId;

    @ElementCollection
    @CollectionTable(name = "submission_answers", joinColumns = @JoinColumn(name = "submission_id"))
    @MapKeyColumn(name = "question_id")
    @Column(name = "answer")
    private Map<Long, String> answers;

    @Column(name = "score", nullable = false)
    private int score;

    @Column(name = "total_marks", nullable = false)
    private int totalMarks;

    // Default constructor for JPA
    public Submission() {}

    // Parameterized constructor
    public Submission(Long id, Long studentId, Long testId, Map<Long, String> answers, int score, int totalMarks) {
        this.id = id;
        this.studentId = studentId;
        this.testId = testId;
        this.answers = answers;
        this.score = score;
        this.totalMarks = totalMarks;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public Long getTestId() { return testId; }
    public void setTestId(Long testId) { this.testId = testId; }
    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public int getTotalMarks() { return totalMarks; }
    public void setTotalMarks(int totalMarks) { this.totalMarks = totalMarks; }
}