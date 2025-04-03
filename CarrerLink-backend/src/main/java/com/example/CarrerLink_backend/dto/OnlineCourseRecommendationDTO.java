package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OnlineCourseRecommendationDTO {
    private Long id;
    private String courseName;
    private String courseLink;
    private String skill;
    private String skillLevel;
    private String recommendationNote;
}