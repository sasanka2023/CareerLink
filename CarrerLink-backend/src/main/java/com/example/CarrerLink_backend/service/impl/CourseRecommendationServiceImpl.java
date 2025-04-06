package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.CourseRecommendationDTO;
import com.example.CarrerLink_backend.entity.AcademicCourse;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.repo.AcademicCourseRepo;
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

    private final AcademicCourseRepo academicCourseRepo;

    @Override
    public List<CourseRecommendationDTO> getRecommendedCoursesWithScores(Student student) {
        return student.getSkills().stream()
                .peek(skill -> log.info("Checking skill: '{}' at level: '{}'",
                        skill.getSkillName(), skill.getSkillLevel()))
                .flatMap(skill -> {
                    String skillName = skill.getSkillName().trim();
                    String skillLevel = skill.getSkillLevel().trim();

                    List<AcademicCourse> courses = academicCourseRepo
                            .findByRequiredSkillIgnoreCaseAndSkillLevelIgnoreCase(skillName, skillLevel);

                    log.info("Found {} courses for skill '{}', level '{}'",
                            courses.size(), skillName, skillLevel);

                    return courses.stream()
                            .map(course -> new CourseRecommendationDTO(
                                    course.getCourseId(),
                                    course.getCourseName(),
                                    course.getRequiredSkill(),
                                    course.getSkillLevel(),
                                    course.getUrl(),
                                    1.0,
                                    "Recommended for your " + skillLevel + " level in " + skillName
                            ));
                })
                .collect(Collectors.toList());
    }


}
