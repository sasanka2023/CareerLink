// TestService.java
package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.entity.Test;

import java.util.List;
import java.util.Optional;

public interface TestService {
    Test saveTest(Test test);
    List<Test> getAllTests();
    Optional<Test> getTestById(Long testId);
    Test updateTest(Long testId, Test test);
    void deleteTest(Long testId);
}