package com.example.CarrerLink_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String title;
    private String mobile;
    private String address;
    private String email;
    private String githubLink;
    private String linkedinLink;

    private String experience;

    @Column(columnDefinition = "LONGTEXT")
    private String summary;
    @OneToMany(mappedBy = "cv",cascade = CascadeType.ALL)

    private List<TechnicalSkills> skills;

    @OneToMany(mappedBy = "cv",cascade = CascadeType.ALL)

    private List<Projects> projects;

    @OneToMany(mappedBy = "cv",cascade = CascadeType.ALL)

    private List<Experience> experiences;

    @OneToMany(mappedBy = "cv",cascade = CascadeType.ALL)

    private List<Education> educations;
    @OneToMany(mappedBy = "cv",cascade = CascadeType.ALL)

    private List<Certification> certifications;

    private String additionalInfo;
    private String lastUpdated;

    private String bio;
    private String referee;
    private String refereeEmail;
    @OneToOne
    @JoinColumn(name = "student_id")

    private Student student;




}
