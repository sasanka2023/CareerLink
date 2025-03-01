package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.SkillAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillAssessmentRepo extends JpaRepository<SkillAssessment, Long> {
}