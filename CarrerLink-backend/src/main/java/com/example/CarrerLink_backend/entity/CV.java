package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Table(name="cv")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CV {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String name;
    private String address;
    private String email;
    private String githubLink;
    private String linkedinLink;
    private String education;
    private String experience;

    @OneToMany(mappedBy = "cv",cascade = CascadeType.ALL)
    private Set<SkillSet> skills;


    private String additionalInfo;
    private String lastUpdated;
    private String projects;
    private String bio;
    private String referee;
    private String refereeEmail;
    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
