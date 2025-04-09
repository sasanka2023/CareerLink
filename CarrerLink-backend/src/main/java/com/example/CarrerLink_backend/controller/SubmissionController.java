// SubmissionController.java
package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.entity.SkillSet;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.entity.Submission;
import com.example.CarrerLink_backend.entity.Test;
import com.example.CarrerLink_backend.repo.SkillSetRepo;
import com.example.CarrerLink_backend.repo.SubmissionRepository;
import com.example.CarrerLink_backend.repo.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubmissionController {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private SkillSetRepo skillSetRepo;

    @PostMapping
    public ResponseEntity<String> submitTest(@RequestBody SubmissionRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long studentId = getStudentIdFromUsername(username); // Replace with actual logic

        // Save the submission
        Submission submission = new Submission(null, studentId, request.getTestId(), request.getAnswers(), request.getScore(), request.getTotalMarks());
        submissionRepository.save(submission);

        // Fetch the test to get the title (skillName)
        Optional<Test> testOpt = testRepository.findById(request.getTestId());
        if (testOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Test not found");
        }
        Test test = testOpt.get();
        String skillName = test.getTitle();

        // Calculate skill level based on score
        String skillLevel = determineSkillLevel(request.getScore(), request.getTotalMarks());

        // Update or create SkillSet entry
        List<SkillSet> existingSkills = skillSetRepo.findByStudent_StudentId(Math.toIntExact(studentId));
        SkillSet skillSet = existingSkills.stream()
                .filter(skill -> skill.getSkillName().equals(skillName))
                .findFirst()
                .orElse(new SkillSet(0, skillName, skillLevel, new Student(studentId), null)); // Assuming CV is optional

        skillSet.setSkillLevel(skillLevel);
        skillSetRepo.save(skillSet);

        return ResponseEntity.ok("Test submitted and skill level updated successfully");
    }

    @GetMapping("/student/{testId}")
    public ResponseEntity<SubmissionResponse> getSubmission(@PathVariable Long testId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long studentId = getStudentIdFromUsername(username);
        Submission submission = submissionRepository.findByStudentIdAndTestId(studentId, testId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        return ResponseEntity.ok(new SubmissionResponse(submission.getScore(), submission.getTotalMarks(), submission.getAnswers()));
    }

    private Long getStudentIdFromUsername(String username) {
        // Replace with actual logic to fetch student ID from your User entity/service
        return 1L; // Placeholder
    }

    private String determineSkillLevel(int score, int totalMarks) {
        double percentage = (double) score / totalMarks * 100;
        if (percentage >= 70 && percentage <= 100) return "Expert";
        else if (percentage >= 60 && percentage < 70) return "Advanced";
        else if (percentage >= 50 && percentage < 60) return "Intermediate";
        else if (percentage >= 40 && percentage < 50) return "Beginner";
        else if (percentage >= 0 && percentage < 40) return "Novice";
        else return "Invalid"; // Shouldn't happen with valid input
    }
}

// DTOs remain unchanged
class SubmissionRequest {
    private Long testId;
    private Map<Long, String> answers;
    private int score;
    private int totalMarks;

    public Long getTestId() { return testId; }
    public void setTestId(Long testId) { this.testId = testId; }
    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public int getTotalMarks() { return totalMarks; }
    public void setTotalMarks(int totalMarks) { this.totalMarks = totalMarks; }
}

class SubmissionResponse {
    private int score;
    private int totalMarks;
    private Map<Long, String> answers;

    public SubmissionResponse(int score, int totalMarks, Map<Long, String> answers) {
        this.score = score;
        this.totalMarks = totalMarks;
        this.answers = answers;
    }

    public int getScore() { return score; }
    public int getTotalMarks() { return totalMarks; }
    public Map<Long, String> getAnswers() { return answers; }
}