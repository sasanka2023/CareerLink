package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.repo.*;
import com.example.CarrerLink_backend.service.StudentTestEnrollmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

/**
 * Implementation of the StudentTestEnrollmentService interface.
 */
@Service
@AllArgsConstructor
public class StudentTestEnrollmentServiceImpl implements StudentTestEnrollmentService {

    private final StudentTestEnrollmentRepository enrollmentRepository;
    private final StudentRepo studentRepository;
    private final SkillTestRepository skillTestRepository;
    private final StudentAnswerRepository studentAnswerRepository;
    private final QuestionRepository questionRepository;

    @Override
    @Transactional
    public StudentTestEnrollment enrollStudent(Long studentId, Long skillTestId) {
        Student student = studentRepository.findById(Math.toIntExact(studentId))
                .orElseThrow(() -> new NoSuchElementException("Student not found with id: " + studentId));

        SkillTest skillTest = skillTestRepository.findById(skillTestId)
                .orElseThrow(() -> new NoSuchElementException("Skill test not found with id: " + skillTestId));

        // Check if student is already enrolled
        Optional<StudentTestEnrollment> existingEnrollment =
                enrollmentRepository.findByStudentStudentIdAndSkillTestId(studentId, skillTestId);

        if (existingEnrollment.isPresent()) {
            throw new IllegalStateException("Student is already enrolled in this test");
        }

        // Check if test is active
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(skillTest.getStartDate()) || now.isAfter(skillTest.getEndDate())) {
            throw new IllegalStateException("Test is not active for enrollment");
        }

        StudentTestEnrollment enrollment = new StudentTestEnrollment();
        enrollment.setStudent(student);
        enrollment.setSkillTest(skillTest);
        enrollment.setEnrollmentDate(now);
        enrollment.setStatus(StudentTestEnrollment.EnrollmentStatus.ENROLLED);

        return enrollmentRepository.save(enrollment);
    }

    @Override
    public StudentTestEnrollment getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Enrollment not found with id: " + id));
    }

    @Override
    public StudentTestEnrollment getEnrollmentByStudentAndTest(Long studentId, Long skillTestId) {
        return enrollmentRepository.findByStudentStudentIdAndSkillTestId(studentId, skillTestId)
                .orElseThrow(() -> new NoSuchElementException(
                        "Enrollment not found for student id: " + studentId + " and test id: " + skillTestId));
    }

    @Override
    public List<StudentTestEnrollment> getEnrollmentsByStudent(Long studentId) {
        if (!studentRepository.existsById(Math.toIntExact(studentId))) {
            throw new NoSuchElementException("Student not found with id: " + studentId);
        }
        return enrollmentRepository.findByStudentStudentId(studentId);
    }

    @Override
    public List<StudentTestEnrollment> getEnrollmentsByTest(Long skillTestId) {
        if (!skillTestRepository.existsById(skillTestId)) {
            throw new NoSuchElementException("Skill test not found with id: " + skillTestId);
        }
        return enrollmentRepository.findBySkillTestId(skillTestId);
    }

    @Override
    public List<StudentTestEnrollment> getEnrollmentsByStudentAndStatus(
            Long studentId, StudentTestEnrollment.EnrollmentStatus status) {
        if (!studentRepository.existsById(Math.toIntExact(studentId))) {
            throw new NoSuchElementException("Student not found with id: " + studentId);
        }
        return enrollmentRepository.findByStudentStudentIdAndStatus(studentId, status);
    }

    @Override
    @Transactional
    public StudentTestEnrollment startTest(Long enrollmentId) {
        StudentTestEnrollment enrollment = getEnrollmentById(enrollmentId);

        if (enrollment.getStatus() != StudentTestEnrollment.EnrollmentStatus.ENROLLED) {
            throw new IllegalStateException("Test has already been started or completed");
        }

        // Check if test is still active
        SkillTest skillTest = enrollment.getSkillTest();
        LocalDateTime now = LocalDateTime.now();
        if (now.isAfter(skillTest.getEndDate())) {
            throw new IllegalStateException("Test period has ended");
        }

        enrollment.setStartTime(now);
        enrollment.setStatus(StudentTestEnrollment.EnrollmentStatus.IN_PROGRESS);

        return enrollmentRepository.save(enrollment);
    }

    @Override
    @Transactional
    public StudentTestEnrollment submitTest(Long enrollmentId) {
        StudentTestEnrollment enrollment = getEnrollmentById(enrollmentId);

        if (enrollment.getStatus() != StudentTestEnrollment.EnrollmentStatus.IN_PROGRESS) {
            throw new IllegalStateException("Test is not in progress");
        }

        enrollment.setCompletionTime(LocalDateTime.now());
        enrollment.setStatus(StudentTestEnrollment.EnrollmentStatus.COMPLETED);

        return enrollmentRepository.save(enrollment);
    }

    @Override
    @Transactional
    public StudentTestEnrollment evaluateTest(Long enrollmentId) {
        StudentTestEnrollment enrollment = getEnrollmentById(enrollmentId);

        if (enrollment.getStatus() != StudentTestEnrollment.EnrollmentStatus.COMPLETED) {
            throw new IllegalStateException("Test is not completed yet");
        }

        List<StudentAnswer> answers = studentAnswerRepository.findByEnrollmentId(enrollmentId);
        int totalMarks = 0;

        for (StudentAnswer answer : answers) {
            if (answer.getMarksObtained() != null) {
                totalMarks += answer.getMarksObtained();
            }
        }

        enrollment.setObtainedMarks(totalMarks);
        enrollment.setStatus(StudentTestEnrollment.EnrollmentStatus.EVALUATED);

        return enrollmentRepository.save(enrollment);
    }

    @Override
    @Transactional
    public StudentAnswer saveStudentAnswer(Long enrollmentId, Long questionId, StudentAnswer answer) {
        StudentTestEnrollment enrollment = getEnrollmentById(enrollmentId);

        if (enrollment.getStatus() != StudentTestEnrollment.EnrollmentStatus.IN_PROGRESS) {
            throw new IllegalStateException("Test is not in progress");
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new NoSuchElementException("Question not found with id: " + questionId));

        // Fixed: Compare skill test IDs to ensure question belongs to the enrolled test
        if (!question.getSkillTest().getId().equals(enrollment.getSkillTest().getId())) {
            throw new IllegalArgumentException("Question does not belong to the enrolled test");
        }

        // Check if answer already exists
        Optional<StudentAnswer> existingAnswer =
                studentAnswerRepository.findByEnrollmentIdAndQuestionId(enrollmentId, questionId);

        StudentAnswer studentAnswer;
        if (existingAnswer.isPresent()) {
            studentAnswer = existingAnswer.get();
            studentAnswer.setTextAnswer(answer.getTextAnswer());
            studentAnswer.setSelectedOptions(answer.getSelectedOptions());
        } else {
            studentAnswer = new StudentAnswer();
            studentAnswer.setEnrollment(enrollment);
            studentAnswer.setQuestion(question);
            studentAnswer.setTextAnswer(answer.getTextAnswer());
            studentAnswer.setSelectedOptions(answer.getSelectedOptions());
        }

        // Auto-evaluate for multiple choice and true/false questions
        if (question.getQuestionType() == Question.QuestionType.MULTIPLE_CHOICE ||
                question.getQuestionType() == Question.QuestionType.SINGLE_CHOICE ||
                question.getQuestionType() == Question.QuestionType.TRUE_FALSE) {
            autoEvaluateAnswer(studentAnswer);
        }

        return studentAnswerRepository.save(studentAnswer);
    }

    @Override
    public List<StudentAnswer> getStudentAnswers(Long enrollmentId) {
        if (!enrollmentRepository.existsById(enrollmentId)) {
            throw new NoSuchElementException("Enrollment not found with id: " + enrollmentId);
        }
        return studentAnswerRepository.findByEnrollmentId(enrollmentId);
    }

    @Override
    public Long getEnrollmentCountByTest(Long testId) {
        if (!skillTestRepository.existsById(testId)) {
            throw new NoSuchElementException("Skill test not found with id: " + testId);
        }
        return enrollmentRepository.countEnrollmentsByTestId(testId);
    }

    private void autoEvaluateAnswer(StudentAnswer answer) {
        Question question = answer.getQuestion();
        int maxMarks = question.getMarks();

        // Get all correct options for the question
        List<Option> allOptions = question.getOptions();
        long totalCorrectOptions = allOptions.stream()
                .filter(Option::getIsCorrect)
                .count();

        // Count how many correct options the student selected
        long correctlySelected = answer.getSelectedOptions().stream()
                .filter(Option::getIsCorrect)
                .count();

        // Count incorrect selections
        long incorrectlySelected = answer.getSelectedOptions().size() - correctlySelected;

        if (question.getQuestionType() == Question.QuestionType.SINGLE_CHOICE ||
                question.getQuestionType() == Question.QuestionType.TRUE_FALSE) {
            // For single choice, it's either correct or incorrect
            if (answer.getSelectedOptions().size() == 1 && correctlySelected == 1) {
                answer.setMarksObtained(maxMarks);
            } else {
                answer.setMarksObtained(0);
            }
        } else if (question.getQuestionType() == Question.QuestionType.MULTIPLE_CHOICE) {
            // For multiple choice, calculate partial marks
            if (incorrectlySelected > 0) {
                // Penalize for incorrect selections
                answer.setMarksObtained(0);
            } else if (correctlySelected == totalCorrectOptions) {
                // All correct options selected
                answer.setMarksObtained(maxMarks);
            } else {
                // Partial credit
                answer.setMarksObtained((int) (maxMarks * ((double) correctlySelected / totalCorrectOptions)));
            }
        }
    }
}