package com.example.CarrerLink_backend.dto;

import com.example.CarrerLink_backend.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CVUpdateRequestDTO {
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
