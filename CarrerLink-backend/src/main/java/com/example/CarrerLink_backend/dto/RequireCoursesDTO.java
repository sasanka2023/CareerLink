package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequireCoursesDTO {
    private int courceId;
    private String courceName;
    private String requiredSkill;
    private String skillLevel;
    private String url;
    private double score;
    private String recommendationMessage;

}