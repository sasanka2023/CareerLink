package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.AcademicCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface AcademicCourseRepo extends JpaRepository<AcademicCourse, Long> {
    Optional<AcademicCourse> findByCourseName(String courseName);

    List<AcademicCourse> findByRequiredSkillIgnoreCase(String requiredSkill);
    List<AcademicCourse> findBySkillLevel(String skillLevel);
    List<AcademicCourse> findByRequiredSkillAndSkillLevelIgnoreCase(String requiredSkill, String skillLevel);
}

