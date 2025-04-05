package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.entity.Skill;

import java.util.List;

public interface SkillService {
    Skill createSkill(Skill skill);

    Skill getSkillById(Long id);

    Skill getSkillByName(String name);

    List<Skill> getAllSkills();

    Skill updateSkill(Long id, Skill skill);

    void deleteSkill(Long id);

    boolean existsByName(String name);
}