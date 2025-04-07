package com.example.CarrerLink_backend.dto.response;


import com.example.CarrerLink_backend.dto.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentgetResponseDTO {
    private int studentId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String userName;
    private List<JobFieldDTO> jobsFields;
    private List<SkillSetDTO> skills;
    private List<TechnologyDTO> technologies;
    private List<AcedemicResultsDTO> acedemicResults;
    private String university;
    private String department;
    private String degree;
    private List<ReviewDTO> reviews;
    private List<ProjectsDTO> projects;
    private String profileImageUrl;
    private boolean isApproved;// Add this field


}
