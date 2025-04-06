// TestServiceImpl.java
package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.entity.Test;
import com.example.CarrerLink_backend.repo.TestRepository;
import com.example.CarrerLink_backend.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Override
    public Test saveTest(Test test) {
        return testRepository.save(test);
    }

    @Override
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    @Override
    public Optional<Test> getTestById(Long testId) {
        return testRepository.findById(testId);
    }

    @Override
    public Test updateTest(Long testId, Test test) {
        test.setTestId(testId);
        return testRepository.save(test);
    }

    @Override
    public void deleteTest(Long testId) {
        testRepository.deleteById(testId);
    }
}