package com.example.CarrerLink_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectId;

    private String projectName;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String projectDescription;

    private String githubLink;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

}
