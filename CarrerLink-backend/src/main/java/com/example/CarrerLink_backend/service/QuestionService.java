package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.entity.Question;
import com.example.CarrerLink_backend.entity.Option;

import java.util.List;

public interface QuestionService {
    Question createQuestion(Question question, Long skillTestId);

    Question getQuestionById(Long id);

    List<Question> getQuestionsBySkillTest(Long skillTestId);

    Question updateQuestion(Long id, Question question);

    void deleteQuestion(Long id);

    Option addOption(Long questionId, Option option);

    void removeOption(Long questionId, Long optionId);

    List<Option> getOptionsByQuestion(Long questionId);
}