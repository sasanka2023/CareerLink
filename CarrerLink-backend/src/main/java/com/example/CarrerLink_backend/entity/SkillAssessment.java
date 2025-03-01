package com.example.CarrerLink_backend.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class SkillAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String skillName; // e.g., "Java", "Python"
    private String description;
    private int duration; // in minutes
    private LocalDateTime startTime;
    private LocalDateTime endTime; // Defines availability period

    @ManyToMany(mappedBy = "enrolledAssessments")
    private List<Skill> learners;
}