// SubmissionController.java
package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.entity.Submission;
import com.example.CarrerLink_backend.repo.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionRepository submissionRepository;

    @PostMapping
    public ResponseEntity<String> submitTest(@RequestBody SubmissionRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long studentId = getStudentIdFromUsername(username); // Replace with actual logic
        Submission submission = new Submission(null, studentId, request.getTestId(), request.getAnswers(), request.getScore(), request.getTotalMarks());
        submissionRepository.save(submission);
        return ResponseEntity.ok("Test submitted successfully");
    }

    @GetMapping("/student/{testId}")
    public ResponseEntity<SubmissionResponse> getSubmission(@PathVariable Long testId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long studentId = getStudentIdFromUsername(username); // Replace with actual logic
        Submission submission = submissionRepository.findByStudentIdAndTestId(studentId, testId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        return ResponseEntity.ok(new SubmissionResponse(submission.getScore(), submission.getTotalMarks(), submission.getAnswers()));
    }

    // Placeholder method - replace with actual logic to fetch student ID
    private Long getStudentIdFromUsername(String username) {
        // Example: Query your User table or service to get the student ID
        // For now, returning a static value
        return 1L; // Replace with real implementation
    }
}

// DTO for incoming submission request
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

// DTO for outgoing submission response
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