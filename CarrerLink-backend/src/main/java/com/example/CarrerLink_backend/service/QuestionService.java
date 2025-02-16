package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.response.QuestionResponseDTO;

import java.util.List;

public interface QuestionService {
    String saveQuestion(QuestionResponseDTO questionResponseDTO, Integer testId);

    List<QuestionResponseDTO> getQuestionsByTest(Integer testId);

    QuestionResponseDTO getQuestionById(Integer questionId);

    String updateQuestion(QuestionResponseDTO questionResponseDTO);

    String deleteQuestion(Integer questionId);
}
