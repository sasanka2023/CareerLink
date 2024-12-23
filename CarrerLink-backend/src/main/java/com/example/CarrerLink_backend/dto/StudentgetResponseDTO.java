package com.example.CarrerLink_backend.dto;

import com.example.CarrerLink_backend.entity.AcedemicResults;
import com.example.CarrerLink_backend.entity.Job;
import com.example.CarrerLink_backend.entity.SkillSet;
import com.example.CarrerLink_backend.entity.Technology;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentgetResponseDTO {
    private int StudentId;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String userName;
    private List<JobgetResponseDTO> jobs;
    private List<SkillSetDTO> skills;
    private List<TechnologyDTO> technologies;
    private List<AcedemicResultsDTO> acedemicResults;
    private String university;
    private String department;
    private String degree;

}
