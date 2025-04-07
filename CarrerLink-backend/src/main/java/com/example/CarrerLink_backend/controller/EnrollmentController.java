// EnrollmentController.java
package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.entity.Enrollment;
import com.example.CarrerLink_backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @PostMapping
    public ResponseEntity<String> enrollInTest(@RequestBody EnrollmentRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        // Assume studentId is derived from username or token (simplified)
        Long studentId = getStudentIdFromUsername(username); // Implement this logic
        Enrollment enrollment = new Enrollment(null, studentId, request.getTestId());
        enrollmentRepository.save(enrollment);
        return ResponseEntity.ok("Enrolled successfully");
    }

    @GetMapping("/student")
    public ResponseEntity<List<Enrollment>> getEnrolledTests() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long studentId = getStudentIdFromUsername(username); // Implement this logic
        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);
        return ResponseEntity.ok(enrollments);
    }

    // Dummy method - replace with actual student ID retrieval
    private Long getStudentIdFromUsername(String username) {
        // Replace with real logic, e.g., query a User/Student table
        return 1L; // Example student ID
    }
}

class EnrollmentRequest {
    private Long testId;

    public Long getTestId() { return testId; }
    public void setTestId(Long testId) { this.testId = testId; }
}