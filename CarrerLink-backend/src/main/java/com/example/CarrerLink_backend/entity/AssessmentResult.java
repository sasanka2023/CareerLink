package com.example.CarrerLink_backend.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class AssessmentResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "learner_id")
    private Skill learner;

    @ManyToOne
    @JoinColumn(name = "assessment_id")
    private SkillAssessment skillAssessment;

    private double marks;
}