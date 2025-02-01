package com.example.CarrerLink_backend.service;

import java.util.List;

public interface CourseRecommendationService {
    List<String> getRecommendedCourses(int studentId);
}
