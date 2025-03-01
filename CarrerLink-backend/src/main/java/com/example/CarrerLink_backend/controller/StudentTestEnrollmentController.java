package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.entity.StudentAnswer;
import com.example.CarrerLink_backend.entity.StudentTestEnrollment;
import com.example.CarrerLink_backend.service.StudentTestEnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class StudentTestEnrollmentController {

    private final StudentTestEnrollmentService enrollmentService;

    @Autowired
    public StudentTestEnrollmentController(StudentTestEnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollStudent(
            @RequestParam Long studentId,
            @RequestParam Long skillTestId) {
        try {
            StudentTestEnrollment enrollment = enrollmentService.enrollStudent(studentId, skillTestId);
            return new ResponseEntity<>(enrollment, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEnrollmentById(@PathVariable Long id) {
        try {
            StudentTestEnrollment enrollment = enrollmentService.getEnrollmentById(id);
            return new ResponseEntity<>(enrollment, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/student/{studentId}/test/{skillTestId}")
    public ResponseEntity<?> getEnrollmentByStudentAndTest(
            @PathVariable Long studentId,
            @PathVariable Long skillTestId) {
        try {
            StudentTestEnrollment enrollment =
                    enrollmentService.getEnrollmentByStudentAndTest(studentId, skillTestId);
            return new ResponseEntity<>(enrollment, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getEnrollmentsByStudent(@PathVariable Long studentId) {
        try {
            List<StudentTestEnrollment> enrollments = enrollmentService.getEnrollmentsByStudent(studentId);
            return new ResponseEntity<>(enrollments, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/test/{skillTestId}")
    public ResponseEntity<?> getEnrollmentsByTest(@PathVariable Long skillTestId) {
        try {
            List<StudentTestEnrollment> enrollments = enrollmentService.getEnrollmentsByTest(skillTestId);
            return new ResponseEntity<>(enrollments, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/student/{studentId}/status/{status}")
    public ResponseEntity<?> getEnrollmentsByStudentAndStatus(
            @PathVariable Long studentId,
            @PathVariable StudentTestEnrollment.EnrollmentStatus status) {
        try {
            List<StudentTestEnrollment> enrollments =
                    enrollmentService.getEnrollmentsByStudentAndStatus(studentId, status);
            return new ResponseEntity<>(enrollments, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{enrollmentId}/start")
    public ResponseEntity<?> startTest(@PathVariable Long enrollmentId) {
        try {
            StudentTestEnrollment enrollment = enrollmentService.startTest(enrollmentId);
            return new ResponseEntity<>(enrollment, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{enrollmentId}/submit")
    public ResponseEntity<?> submitTest(@PathVariable Long enrollmentId) {
        try {
            StudentTestEnrollment enrollment = enrollmentService.submitTest(enrollmentId);
            return new ResponseEntity<>(enrollment, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{enrollmentId}/evaluate")
    public ResponseEntity<?> evaluateTest(@PathVariable Long enrollmentId) {
        try {
            StudentTestEnrollment enrollment = enrollmentService.evaluateTest(enrollmentId);
            return new ResponseEntity<>(enrollment, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{enrollmentId}/answers")
    public ResponseEntity<?> saveStudentAnswer(
            @PathVariable Long enrollmentId,
            @RequestParam Long questionId,
            @RequestBody StudentAnswer answer) {
        try {
            StudentAnswer savedAnswer =
                    enrollmentService.saveStudentAnswer(enrollmentId, questionId, answer);
            return new ResponseEntity<>(savedAnswer, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalStateException | IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{enrollmentId}/answers")
    public ResponseEntity<?> getStudentAnswers(@PathVariable Long enrollmentId) {
        try {
            List<StudentAnswer> answers = enrollmentService.getStudentAnswers(enrollmentId);
            return new ResponseEntity<>(answers, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/test/{testId}/count")
    public ResponseEntity<?> getEnrollmentCountByTest(@PathVariable Long testId) {
        try {
            Long count = enrollmentService.getEnrollmentCountByTest(testId);
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}