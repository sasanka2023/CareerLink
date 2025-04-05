package com.example.CarrerLink_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequireCoursesDTO {

    private int courseId;
    private String courseName;
    private String requiredSkill;
    private String skillLevel;

    private String url;
}
