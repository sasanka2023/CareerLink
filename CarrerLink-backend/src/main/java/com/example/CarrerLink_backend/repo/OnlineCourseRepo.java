package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.OnlineCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OnlineCourseRepo extends JpaRepository<OnlineCourse, Long> {
    List<OnlineCourse> findBySkillIgnoreCaseAndSkillLevelIgnoreCase(String skill, String skillLevel);
}