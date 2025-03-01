package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.entity.Option;
import com.example.CarrerLink_backend.entity.Question;
import com.example.CarrerLink_backend.entity.SkillTest;
import com.example.CarrerLink_backend.repo.OptionRepository;
import com.example.CarrerLink_backend.repo.QuestionRepository;
import com.example.CarrerLink_backend.repo.SkillTestRepository;
import com.example.CarrerLink_backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final SkillTestRepository skillTestRepository;
    private final OptionRepository optionRepository;

    @Autowired
    public QuestionServiceImpl(
            QuestionRepository questionRepository,
            SkillTestRepository skillTestRepository,
            OptionRepository optionRepository) {
        this.questionRepository = questionRepository;
        this.skillTestRepository = skillTestRepository;
        this.optionRepository = optionRepository;
    }

    @Override
    public Question createQuestion(Question question, Long skillTestId) {
        SkillTest skillTest = skillTestRepository.findById(skillTestId)
                .orElseThrow(() -> new NoSuchElementException("Skill test not found with id: " + skillTestId));

        question.setSkillTest(skillTest);
        validateQuestion(question);

        return questionRepository.save(question);
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Question not found with id: " + id));
    }

    @Override
    public List<Question> getQuestionsBySkillTest(Long skillTestId) {
        if (!skillTestRepository.existsById(skillTestId)) {
            throw new NoSuchElementException("Skill test not found with id: " + skillTestId);
        }
        return questionRepository.findBySkillTestId(skillTestId);
    }

    @Override
    public Question updateQuestion(Long id, Question question) {
        Question existingQuestion = getQuestionById(id);

        existingQuestion.setQuestionText(question.getQuestionText());
        existingQuestion.setMarks(question.getMarks());
        existingQuestion.setQuestionType(question.getQuestionType());

        validateQuestion(existingQuestion);

        return questionRepository.save(existingQuestion);
    }

    @Override
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new NoSuchElementException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Option addOption(Long questionId, Option option) {
        Question question = getQuestionById(questionId);

        // Updated to use ESSAY and CODING instead of DESCRIPTIVE and CODING
        if (question.getQuestionType() == Question.QuestionType.ESSAY ||
                question.getQuestionType() == Question.QuestionType.CODING) {
            throw new IllegalArgumentException("Cannot add options to essay or coding questions");
        }

        if (question.getQuestionType() == Question.QuestionType.TRUE_FALSE && question.getOptions().size() >= 2) {
            throw new IllegalArgumentException("True/False questions can only have 2 options");
        }

        option.setQuestion(question);
        return optionRepository.save(option);
    }

    @Override
    @Transactional
    public void removeOption(Long questionId, Long optionId) {
        Question question = getQuestionById(questionId);
        Option option = optionRepository.findById(optionId)
                .orElseThrow(() -> new NoSuchElementException("Option not found with id: " + optionId));

        if (!option.getQuestion().getId().equals(questionId)) {
            throw new IllegalArgumentException("Option does not belong to the specified question");
        }

        optionRepository.delete(option);
    }

    @Override
    public List<Option> getOptionsByQuestion(Long questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new NoSuchElementException("Question not found with id: " + questionId);
        }
        return optionRepository.findByQuestionId(questionId);
    }

    private void validateQuestion(Question question) {
        if (question.getMarks() <= 0) {
            throw new IllegalArgumentException("Marks must be greater than 0");
        }

        if (question.getQuestionType() == null) {
            throw new IllegalArgumentException("Question type cannot be null");
        }
    }
}