package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.entity.RequiredCources;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.repo.RequiredCoursesRepo;
import com.example.CarrerLink_backend.service.CourseRecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseRecommendationServiceImpl implements CourseRecommendationService {

    private final RequiredCoursesRepo requiredCoursesRepo;

    @Override
    public List<RequireCoursesDTO> getRecommendedCoursesWithScores(Student student) {
        return student.getSkills().stream()
                .flatMap(skill -> {
                    List<RequiredCources> courses = requiredCoursesRepo
                            .findByRequiredSkillIgnoreCaseAndSkillLevelIgnoreCase(
                                    skill.getSkillName(),
                                    skill.getSkillLevel()
                            );

                    return courses.stream()
                            .map(course -> new RequireCoursesDTO(
                                    course.getCourceId(),
                                    course.getCourceName(),
                                    course.getRequiredSkill(),
                                    course.getSkillLevel(),
                                    course.getUrl(),
                                    1.0, // Score
                                    "Recommended for your " + skill.getSkillLevel() +
                                            " level in " + skill.getSkillName()
                            ));
                })
                .collect(Collectors.toList());
    }
}
