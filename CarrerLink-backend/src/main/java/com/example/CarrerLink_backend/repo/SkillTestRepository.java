package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.SkillTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SkillTestRepository extends JpaRepository<SkillTest, Long> {

    List<SkillTest> findBySkillId(Long skillId);

    List<SkillTest> findByCreatedById(Long adminId);

    @Query("SELECT st FROM SkillTest st WHERE :now BETWEEN st.startDate AND st.endDate")
    List<SkillTest> findActiveTests(@Param("now") LocalDateTime now);

    @Query("SELECT st FROM SkillTest st WHERE st.skill.id = :skillId AND :now BETWEEN st.startDate AND st.endDate")
    List<SkillTest> findActiveTestsBySkill(@Param("skillId") Long skillId, @Param("now") LocalDateTime now);
}
