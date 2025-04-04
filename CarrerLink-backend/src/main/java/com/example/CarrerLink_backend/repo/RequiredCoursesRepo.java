package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.RequiredCourses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJPARepositories
public interface RequiredCoursesRepo extends JpaRepository<RequiredCources, Integer> {

    // Either use this derived query method (no @Query needed)
    List<RequiredCources> findByRequiredSkillIgnoreCaseAndSkillLevelIgnoreCase(
            String requiredSkill,
            String skillLevel
    );

    // OR use this custom query (but not both for the same purpose)
    @Query("SELECT c FROM RequiredCources c WHERE LOWER(c.requiredSkill) = LOWER(:skill) AND LOWER(c.skillLevel) = LOWER(:level)")
    List<RequiredCources> findBySkillAndLevelIgnoreCase(
            @Param("skill") String skill,
            @Param("level") String level
    );
}

