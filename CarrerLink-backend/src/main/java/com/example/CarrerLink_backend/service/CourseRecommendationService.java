package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.entity.Student;
import java.util.List;

public interface CourseRecommendationService {
    List<RequireCoursesDTO> getRecommendedCoursesWithScores(Student student);
}