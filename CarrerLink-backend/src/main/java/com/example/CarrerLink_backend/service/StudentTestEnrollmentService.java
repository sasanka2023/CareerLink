package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.entity.StudentTestEnrollment;
import com.example.CarrerLink_backend.entity.StudentAnswer;

import java.util.List;

public interface StudentTestEnrollmentService {
    StudentTestEnrollment enrollStudent(Long studentId, Long skillTestId);

    StudentTestEnrollment getEnrollmentById(Long id);

    StudentTestEnrollment getEnrollmentByStudentAndTest(Long studentId, Long skillTestId);

    List<StudentTestEnrollment> getEnrollmentsByStudent(Long studentId);

    List<StudentTestEnrollment> getEnrollmentsByTest(Long skillTestId);

    List<StudentTestEnrollment> getEnrollmentsByStudentAndStatus(Long studentId, StudentTestEnrollment.EnrollmentStatus status);

    StudentTestEnrollment startTest(Long enrollmentId);

    StudentTestEnrollment submitTest(Long enrollmentId);

    StudentTestEnrollment evaluateTest(Long enrollmentId);

    StudentAnswer saveStudentAnswer(Long enrollmentId, Long questionId, StudentAnswer answer);

    List<StudentAnswer> getStudentAnswers(Long enrollmentId);

    Long getEnrollmentCountByTest(Long testId);
}