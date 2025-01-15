package com.example.CarrerLink_backend.dto.response;

import com.example.CarrerLink_backend.dto.SkillSetDTO;
import com.example.CarrerLink_backend.entity.SkillSet;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class CVgetResponseDTO {
    private int id;
    private String name;
    private String address;
    private String email;
    private String githubLink;
    private String linkedinLink;
    private String education;
    private String experience;
    private Set<SkillSetDTO> skills;
    private String additionalInfo;
    private String lastUpdated;
    private String projects;
    private String bio;
    private String referee;
    private String refereeEmail;
}
