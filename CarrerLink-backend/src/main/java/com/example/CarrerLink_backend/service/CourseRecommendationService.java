package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.response.RecommendedCoursesDTO;

import java.util.List;

public interface CourseRecommendationService {
    List<RecommendedCoursesDTO> getRecommendedCourses(int studentId);
}
