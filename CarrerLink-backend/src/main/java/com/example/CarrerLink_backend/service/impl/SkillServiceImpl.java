package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.entity.Skill;
import com.example.CarrerLink_backend.repo.SkillRepository;
import com.example.CarrerLink_backend.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Autowired
    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public Skill createSkill(Skill skill) {
        if (skillRepository.existsByName(skill.getName())) {
            throw new IllegalArgumentException("Skill with name " + skill.getName() + " already exists");
        }
        return skillRepository.save(skill);
    }

    @Override
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Skill not found with id: " + id));
    }

    @Override
    public Skill getSkillByName(String name) {
        return skillRepository.findByName(name)
                .orElseThrow(() -> new NoSuchElementException("Skill not found with name: " + name));
    }

    @Override
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @Override
    public Skill updateSkill(Long id, Skill skill) {
        Skill existingSkill = getSkillById(id);

        if (!existingSkill.getName().equals(skill.getName()) && skillRepository.existsByName(skill.getName())) {
            throw new IllegalArgumentException("Skill with name " + skill.getName() + " already exists");
        }

        existingSkill.setName(skill.getName());
        existingSkill.setDescription(skill.getDescription());

        return skillRepository.save(existingSkill);
    }

    @Override
    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new NoSuchElementException("Skill not found with id: " + id);
        }
        skillRepository.deleteById(id);
    }

    @Override
    public boolean existsByName(String name) {
        return skillRepository.existsByName(name);
    }
}