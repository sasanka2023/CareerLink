package com.example.CarrerLink_backend.repo;


import com.example.CarrerLink_backend.entity.SkillSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface SkillSetRepo extends JpaRepository<SkillSet,Integer> {
    List<SkillSet> findByStudent_StudentId(int studentId);
}
