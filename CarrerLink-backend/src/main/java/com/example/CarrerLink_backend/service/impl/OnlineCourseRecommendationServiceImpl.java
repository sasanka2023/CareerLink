package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.OnlineCourseRecommendationDTO;
import com.example.CarrerLink_backend.entity.OnlineCourse;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.repo.OnlineCourseRepo;
import com.example.CarrerLink_backend.service.OnlineCourseRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OnlineCourseRecommendationServiceImpl implements OnlineCourseRecommendationService {

    private final OnlineCourseRepo onlineCourseRepo;

    @Override
    public List<OnlineCourseRecommendationDTO> recommendCoursesForStudent(Student student) {
        return student.getSkills().stream()
                .flatMap(skill -> {
                    List<OnlineCourse> courses = onlineCourseRepo
                            .findBySkillIgnoreCaseAndSkillLevelIgnoreCase(
                                    skill.getSkillName(),
                                    skill.getSkillLevel()
                            );

                    return courses.stream()
                            .map(course -> new OnlineCourseRecommendationDTO(
                                    course.getId(),
                                    course.getCourseName(),
                                    course.getCourseLink(),
                                    course.getSkill(),
                                    course.getSkillLevel(),
                                    "Recommended for your " + skill.getSkillLevel() + " level in " + skill.getSkillName()
                            ));
                })
                .collect(Collectors.toList());
    }
}