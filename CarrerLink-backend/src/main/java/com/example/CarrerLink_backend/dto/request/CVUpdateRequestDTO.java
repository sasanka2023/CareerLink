package com.example.CarrerLink_backend.dto.request;


import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.entity.Projects;
import com.example.CarrerLink_backend.entity.SkillSet;
import com.example.CarrerLink_backend.entity.Technology;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CVUpdateRequestDTO {
    private int id;
    private String name;
    private String title;
    private String mobile;
    private String address;
    private String email;
    private String githubLink;
    private String linkedinLink;
    private String education;
    private String summary;
    private String experience;
    private Set<TechnicalSkillDTO> skills;
    private Set<ProjectsDTO> projects;
    private Set<ExperienceDTO> experiences;
    private Set<EducationDTO> educations;
    private Set<CertificationDTO> certifications;
    private String additionalInfo;
    private String lastUpdated;

    private String bio;
    private String referee;
    private String refereeEmail;
}
