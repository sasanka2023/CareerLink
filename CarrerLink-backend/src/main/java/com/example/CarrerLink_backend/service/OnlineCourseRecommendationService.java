package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.OnlineCourseRecommendationDTO;
import com.example.CarrerLink_backend.entity.Student;
import java.util.List;

public interface OnlineCourseRecommendationService {
    List<OnlineCourseRecommendationDTO> recommendCoursesForStudent(Student student);
}