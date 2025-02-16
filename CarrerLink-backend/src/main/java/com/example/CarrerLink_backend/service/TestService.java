package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.response.TestResponseDTO;

import java.util.List;

public interface TestService {
    String saveTest(TestResponseDTO testResponseDTO);

    List<TestResponseDTO> getTests();

    TestResponseDTO getTestById(Integer testId);

    String updateTest(TestResponseDTO testResponseDTO);

    String deleteTest(Integer testId);
}
