package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.entity.SkillTest;
import com.example.CarrerLink_backend.service.SkillTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/skill-tests")
@CrossOrigin(origins = "*")
public class SkillTestController {

    private final SkillTestService skillTestService;

    @Autowired
    public SkillTestController(SkillTestService skillTestService) {
        this.skillTestService = skillTestService;
    }

    @PostMapping
    public ResponseEntity<?> createSkillTest(
            @RequestBody SkillTest skillTest,
            @RequestParam Long adminId,
            @RequestParam Long skillId) {
        try {
            SkillTest createdTest = skillTestService.createSkillTest(skillTest, adminId, skillId);
            return new ResponseEntity<>(createdTest, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSkillTestById(@PathVariable Long id) {
        try {
            SkillTest skillTest = skillTestService.getSkillTestById(id);
            return new ResponseEntity<>(skillTest, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllSkillTests() {
        try {
            List<SkillTest> skillTests = skillTestService.getAllSkillTests();
            return new ResponseEntity<>(skillTests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/skill/{skillId}")
    public ResponseEntity<?> getSkillTestsBySkill(@PathVariable Long skillId) {
        try {
            List<SkillTest> skillTests = skillTestService.getSkillTestsBySkill(skillId);
            return new ResponseEntity<>(skillTests, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<?> getSkillTestsByAdmin(@PathVariable Long adminId) {
        try {
            List<SkillTest> skillTests = skillTestService.getSkillTestsByAdmin(adminId);
            return new ResponseEntity<>(skillTests, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActiveSkillTests() {
        try {
            List<SkillTest> activeTests = skillTestService.getActiveSkillTests();
            return new ResponseEntity<>(activeTests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/active/skill/{skillId}")
    public ResponseEntity<?> getActiveSkillTestsBySkill(@PathVariable Long skillId) {
        try {
            List<SkillTest> activeTests = skillTestService.getActiveSkillTestsBySkill(skillId);
            return new ResponseEntity<>(activeTests, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkillTest(@PathVariable Long id, @RequestBody SkillTest skillTest) {
        try {
            SkillTest updatedTest = skillTestService.updateSkillTest(id, skillTest);
            return new ResponseEntity<>(updatedTest, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkillTest(@PathVariable Long id) {
        try {
            skillTestService.deleteSkillTest(id);
            return new ResponseEntity<>("Skill test deleted successfully", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}