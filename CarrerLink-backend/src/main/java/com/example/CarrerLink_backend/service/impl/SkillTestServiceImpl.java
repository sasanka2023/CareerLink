package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.entity.Admin;
import com.example.CarrerLink_backend.entity.Skill;
import com.example.CarrerLink_backend.entity.SkillTest;
import com.example.CarrerLink_backend.repo.AdminRepo;
import com.example.CarrerLink_backend.repo.SkillRepository;
import com.example.CarrerLink_backend.repo.SkillTestRepository;
import com.example.CarrerLink_backend.service.SkillTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SkillTestServiceImpl implements SkillTestService {

    private final SkillTestRepository skillTestRepository;
    private final SkillRepository skillRepository;
    private final AdminRepo adminRepository;

    @Autowired
    public SkillTestServiceImpl(
            SkillTestRepository skillTestRepository,
            SkillRepository skillRepository,
            AdminRepo adminRepository) {
        this.skillTestRepository = skillTestRepository;
        this.skillRepository = skillRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public SkillTest createSkillTest(SkillTest skillTest, Long adminId, Long skillId) {
        Admin admin = adminRepository.findById(Math.toIntExact(adminId))
                .orElseThrow(() -> new NoSuchElementException("Admin not found with id: " + adminId));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new NoSuchElementException("Skill not found with id: " + skillId));

        skillTest.setCreatedBy(admin);
        skillTest.setSkill(skill);

        validateSkillTest(skillTest);

        return skillTestRepository.save(skillTest);
    }

    @Override
    public SkillTest getSkillTestById(Long id) {
        return skillTestRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Skill test not found with id: " + id));
    }

    @Override
    public List<SkillTest> getAllSkillTests() {
        return skillTestRepository.findAll();
    }

    @Override
    public List<SkillTest> getSkillTestsBySkill(Long skillId) {
        if (!skillRepository.existsById(skillId)) {
            throw new NoSuchElementException("Skill not found with id: " + skillId);
        }
        return skillTestRepository.findBySkillId(skillId);
    }

    @Override
    public List<SkillTest> getSkillTestsByAdmin(Long adminId) {
        if (!adminRepository.existsById(Math.toIntExact(adminId))) {
            throw new NoSuchElementException("Admin not found with id: " + adminId);
        }
        return skillTestRepository.findByCreatedById(adminId);
    }

    @Override
    public List<SkillTest> getActiveSkillTests() {
        return skillTestRepository.findActiveTests(LocalDateTime.now());
    }

    @Override
    public List<SkillTest> getActiveSkillTestsBySkill(Long skillId) {
        if (!skillRepository.existsById(skillId)) {
            throw new NoSuchElementException("Skill not found with id: " + skillId);
        }
        return skillTestRepository.findActiveTestsBySkill(skillId, LocalDateTime.now());
    }

    @Override
    public SkillTest updateSkillTest(Long id, SkillTest skillTest) {
        SkillTest existingTest = getSkillTestById(id);

        existingTest.setTitle(skillTest.getTitle());
        existingTest.setDescription(skillTest.getDescription());
        existingTest.setDurationMinutes(skillTest.getDurationMinutes());
        existingTest.setTotalMarks(skillTest.getTotalMarks());
        existingTest.setStartDate(skillTest.getStartDate());
        existingTest.setEndDate(skillTest.getEndDate());

        validateSkillTest(existingTest);

        return skillTestRepository.save(existingTest);
    }

    @Override
    public void deleteSkillTest(Long id) {
        if (!skillTestRepository.existsById(id)) {
            throw new NoSuchElementException("Skill test not found with id: " + id);
        }
        skillTestRepository.deleteById(id);
    }

    private void validateSkillTest(SkillTest skillTest) {
        if (skillTest.getStartDate().isAfter(skillTest.getEndDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }

        if (skillTest.getDurationMinutes() <= 0) {
            throw new IllegalArgumentException("Duration must be greater than 0");
        }

        if (skillTest.getTotalMarks() <= 0) {
            throw new IllegalArgumentException("Total marks must be greater than 0");
        }
    }
}