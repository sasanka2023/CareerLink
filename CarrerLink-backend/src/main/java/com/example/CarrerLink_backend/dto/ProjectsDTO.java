package com.example.CarrerLink_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectsDTO {
    private int projectId;

    private String projectName;

    private String projectDescription;

    private String githubLink;

}
