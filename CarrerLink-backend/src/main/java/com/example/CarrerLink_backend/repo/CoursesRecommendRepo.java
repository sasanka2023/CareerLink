package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.RequiredCourses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursesRecommendRepo extends JpaRepository<RequiredCourses, Integer> {

    List<RequiredCourses> findByRequiredSkillIgnoreCaseAndSkillLevelIgnoreCase(
            String requiredSkill,
            String skillLevel
    );

    // Optional custom query
    @Query("SELECT c FROM RequiredCourses c WHERE LOWER(c.requiredSkill) = LOWER(:skill) AND LOWER(c.skillLevel) = LOWER(:level)")
    List<RequiredCourses> findBySkillAndLevelIgnoreCase(
            @Param("skill") String skill,
            @Param("level") String level
    );
}
