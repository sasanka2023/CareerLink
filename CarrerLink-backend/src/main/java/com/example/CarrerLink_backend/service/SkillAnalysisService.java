package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.entity.CV;
import com.example.CarrerLink_backend.entity.Student;

import java.util.List;

public interface SkillAnalysisService {

    void saveSkillsFromAcedemicResults(Student savedstudent);
    String determineSkillLevel(String result);
}
