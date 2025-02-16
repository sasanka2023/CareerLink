package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.response.QuestionResponseDTO;
import com.example.CarrerLink_backend.entity.Question;
import com.example.CarrerLink_backend.entity.Test;
import com.example.CarrerLink_backend.repo.QuestionRepo;
import com.example.CarrerLink_backend.repo.TestRepo;
import com.example.CarrerLink_backend.service.QuestionService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepo questionRepo;
    private final TestRepo testRepo;
    private final ModelMapper modelMapper;

    @Override
    public String saveQuestion(QuestionResponseDTO questionResponseDTO, Integer testId) {
        Optional<Test> test = testRepo.findById(testId);
        if (test.isPresent()) {
            Question question = modelMapper.map(questionResponseDTO, Question.class);
            question.setTest(test.get());
            questionRepo.save(question);
            return "Question saved";
        } else {
            return "Test not found";
        }
    }

    @Override
    public List<QuestionResponseDTO> getQuestionsByTest(Integer testId) {
        List<Question> questions = questionRepo.findByTestId(testId);
        return modelMapper.map(questions, new TypeToken<List<QuestionResponseDTO>>() {}.getType());
    }

    @Override
    public QuestionResponseDTO getQuestionById(Integer questionId) {
        Optional<Question> question = questionRepo.findById(questionId);
        return question.map(value -> modelMapper.map(value, QuestionResponseDTO.class)).orElse(null);
    }

    @Override
    public String updateQuestion(QuestionResponseDTO questionResponseDTO) {
        if (questionRepo.existsById(questionResponseDTO.getId())) {
            Question question = modelMapper.map(questionResponseDTO, Question.class);
            questionRepo.save(question);
            return "Question updated";
        } else {
            throw new RuntimeException("Question not found");
        }
    }

    @Override
    public String deleteQuestion(Integer questionId) {
        if (questionRepo.existsById(questionId)) {
            questionRepo.deleteById(questionId);
            return "Question deleted";
        } else {
            throw new RuntimeException("Question not found");
        }
    }
}
