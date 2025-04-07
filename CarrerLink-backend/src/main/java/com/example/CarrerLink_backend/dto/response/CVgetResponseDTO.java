package com.example.CarrerLink_backend.dto.response;

import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.entity.Projects;
import com.example.CarrerLink_backend.entity.SkillSet;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class CVgetResponseDTO {
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
    private List<TechnicalSkillDTO> skills;
    private List<ProjectsDTO> projects;
    private List<ExperienceDTO> experiences;
    private List<EducationDTO> educations;
    private List<CertificationDTO> certifications;
    private String additionalInfo;
    private String lastUpdated;

    private String bio;
    private String referee;
    private String refereeEmail;
}
