package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.ProjectIdeaDTO;

import java.util.List;

public interface ProjectRecommendationService {
    List<ProjectIdeaDTO> getProjectRecommendations(int studentId);
}