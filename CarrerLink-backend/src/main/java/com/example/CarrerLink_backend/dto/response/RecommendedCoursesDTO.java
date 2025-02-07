package com.example.CarrerLink_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendedCoursesDTO {
    private String courseName;
    private String courseUrl;
}
