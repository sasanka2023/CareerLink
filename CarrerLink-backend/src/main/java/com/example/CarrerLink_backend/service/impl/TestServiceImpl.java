package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.response.TestResponseDTO;
import com.example.CarrerLink_backend.entity.Test;
import com.example.CarrerLink_backend.repo.TestRepo;
import com.example.CarrerLink_backend.service.TestService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TestServiceImpl implements TestService {

    private final TestRepo testRepo;
    private final ModelMapper modelMapper;

    @Override
    public String saveTest(TestResponseDTO testResponseDTO) {
        Test test = modelMapper.map(testResponseDTO, Test.class);
        testRepo.save(test);
        return test.getTitle() + " saved";
    }

    @Override
    public List<TestResponseDTO> getTests() {
        List<Test> tests = testRepo.findAll();
        return modelMapper.map(tests, new TypeToken<List<TestResponseDTO>>() {}.getType());
    }

    @Override
    public TestResponseDTO getTestById(Integer testId) {
        Optional<Test> test = testRepo.findById(testId);
        return test.map(value -> modelMapper.map(value, TestResponseDTO.class)).orElse(null);
    }

    @Override
    public String updateTest(TestResponseDTO testResponseDTO) {
        if (testRepo.existsById(testResponseDTO.getId())) {
            Test test = modelMapper.map(testResponseDTO, Test.class);
            testRepo.save(test);
            return test.getTitle() + " updated";
        } else {
            throw new RuntimeException("Test not found");
        }
    }

    @Override
    public String deleteTest(Integer testId) {
        if (testRepo.existsById(testId)) {
            testRepo.deleteById(testId);
            return "Test deleted";
        } else {
            throw new RuntimeException("Test not found");
        }
    }
}
