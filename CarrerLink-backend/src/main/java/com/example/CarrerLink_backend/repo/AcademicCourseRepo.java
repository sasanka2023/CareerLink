package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.AcademicCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface AcademicCourseRepo extends JpaRepository<AcademicCourse, Long> {
    Optional<AcademicCourse> findByCourseName(String courseName);

    List<AcademicCourse> findByRequiredSkillIgnoreCaseAndSkillLevelIgnoreCase(
            String requiredSkill,
            String skillLevel
    );

    // Optional custom query
    @Query("SELECT c FROM AcademicCourse c WHERE LOWER(c.requiredSkill) = LOWER(:skill) AND LOWER(c.skillLevel) = LOWER(:level)")
    List<AcademicCourse> findBySkillAndLevelIgnoreCase(
            @Param("skill") String skill,
            @Param("level") String level
    );
}

