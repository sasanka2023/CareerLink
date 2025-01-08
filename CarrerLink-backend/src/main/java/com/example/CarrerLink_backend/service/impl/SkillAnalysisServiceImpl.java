package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.entity.AcedemicResults;

import com.example.CarrerLink_backend.entity.SkillSet;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.repo.AcademicCourseRepo;
import com.example.CarrerLink_backend.repo.AcademicResultsRepo;
import com.example.CarrerLink_backend.repo.SkillSetRepo;
import com.example.CarrerLink_backend.repo.StudentRepo;
import com.example.CarrerLink_backend.service.SkillAnalysisService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class SkillAnalysisServiceImpl implements SkillAnalysisService {

    private final SkillSetRepo skillSetRepo;

    @Override
    public void saveSkillsFromAcedemicResults(Student savedStudent) {
        List<SkillSet> skillSetList = new ArrayList<>();
        for (AcedemicResults results : savedStudent.getAcedemicResults()) {
            String skillLevel = determineSkillLevel(results.getResult());
            results.setSkillLevel(skillLevel);
            SkillSet skills = new SkillSet();
            skills.setSkillName(results.getCourse());
            skills.setSkillLevel(skillLevel);
            skills.setStudents(savedStudent);
            skillSetList.add(skills);
        }
        skillSetRepo.saveAll(skillSetList);
    }

    public String determineSkillLevel(String result) {
        switch (result) {
            case "A+":
            case "A":
                return "Expert";
            case "A-":
            case "B+":
                return "Advanced";
            case "B":
            case "B-":
            case "C+":
                return "Intermediate";
            case "C":
            case "C-":
                return "Beginner";
            case "D+":
            case "E":
            default:
                return "Novice";
        }
    }

}
