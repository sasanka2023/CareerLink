package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String questionText;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType questionType;

    @Column(nullable = false)
    private int marks;

    @ManyToOne
    @JoinColumn(name = "skill_test_id", nullable = false)
    private SkillTest skillTest;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options = new ArrayList<>();

    // Enum definition
    public enum QuestionType {
        MULTIPLE_CHOICE,
        SINGLE_CHOICE,
        TRUE_FALSE
    }

    // Explicit getters required by the service
    public int getMarks() {
        return marks;
    }

    public List<Option> getOptions() {
        return options;
    }

    public SkillTest getSkillTest() {
        return skillTest;
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    // Explicit setters (optional, as @Data provides them)
    public void setMarks(int marks) {
        this.marks = marks;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }

    public void setSkillTest(SkillTest skillTest) {
        this.skillTest = skillTest;
    }

    public void setQuestionType(QuestionType questionType) {
        this.questionType = questionType;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }
}