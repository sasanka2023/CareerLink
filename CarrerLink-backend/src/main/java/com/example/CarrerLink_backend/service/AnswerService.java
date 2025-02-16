package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.response.AnswerResponseDTO;

import java.util.List;

public interface AnswerService {
    String saveAnswer(AnswerResponseDTO answerResponseDTO, Integer questionId);

    List<AnswerResponseDTO> getAnswersByQuestion(Integer questionId);

    AnswerResponseDTO getAnswerById(Integer answerId);

    String updateAnswer(AnswerResponseDTO answerResponseDTO);

    String deleteAnswer(Integer answerId);
}
