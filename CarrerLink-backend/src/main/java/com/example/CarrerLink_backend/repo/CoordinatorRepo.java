package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.SkillTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoordinatorRepo extends JpaRepository<SkillTest, Long> {
}