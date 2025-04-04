package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.entity.SkillTest;

import java.util.List;

public interface SkillTestService {
    SkillTest createSkillTest(SkillTest skillTest, Long adminId, Long skillId);

    SkillTest getSkillTestById(Long id);

    List<SkillTest> getAllSkillTests();

    List<SkillTest> getSkillTestsBySkill(Long skillId);

    List<SkillTest> getSkillTestsByAdmin(Long adminId);

    List<SkillTest> getActiveSkillTests();

    List<SkillTest> getActiveSkillTestsBySkill(Long skillId);

    SkillTest updateSkillTest(Long id, SkillTest skillTest);

    void deleteSkillTest(Long id);
}