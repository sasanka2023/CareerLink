package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String skills;
    private String additionalInfo;
    private String lastUpdated;
    private String projects;
}
