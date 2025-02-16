package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.response.AnswerResponseDTO;
import com.example.CarrerLink_backend.entity.Answer;
import com.example.CarrerLink_backend.entity.Question;
import com.example.CarrerLink_backend.repo.AnswerRepo;
import com.example.CarrerLink_backend.repo.QuestionRepo;
import com.example.CarrerLink_backend.service.AnswerService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepo answerRepo;
    private final QuestionRepo questionRepo;
    private final ModelMapper modelMapper;

    @Override
    public String saveAnswer(AnswerResponseDTO answerResponseDTO, Integer questionId) {
        Optional<Question> question = questionRepo.findById(questionId);
        if (question.isPresent()) {
            Answer answer = modelMapper.map(answerResponseDTO, Answer.class);
            answer.setQuestion(question.get());
            answerRepo.save(answer);
            return "Answer saved";
        } else {
            return "Question not found";
        }
    }

    @Override
    public List<AnswerResponseDTO> getAnswersByQuestion(Integer questionId) {
        List<Answer> answers = answerRepo.findByQuestionId(questionId);
        return modelMapper.map(answers, new TypeToken<List<AnswerResponseDTO>>() {}.getType());
    }

    @Override
    public AnswerResponseDTO getAnswerById(Integer answerId) {
        Optional<Answer> answer = answerRepo.findById(answerId);
        return answer.map(value -> modelMapper.map(value, AnswerResponseDTO.class)).orElse(null);
    }

    @Override
    public String updateAnswer(AnswerResponseDTO answerResponseDTO) {
        if (answerRepo.existsById(answerResponseDTO.getId())) {
            Answer answer = modelMapper.map(answerResponseDTO, Answer.class);
            answerRepo.save(answer);
            return "Answer updated";
        } else {
            throw new RuntimeException("Answer not found");
        }
    }

    @Override
    public String deleteAnswer(Integer answerId) {
        if (answerRepo.existsById(answerId)) {
            answerRepo.deleteById(answerId);
            return "Answer deleted";
        } else {
            throw new RuntimeException("Answer not found");
        }
    }
}
