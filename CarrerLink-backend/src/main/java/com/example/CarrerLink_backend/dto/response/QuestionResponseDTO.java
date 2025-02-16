package com.example.CarrerLink_backend.dto.response;

import com.example.CarrerLink_backend.dto.AnswerDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QuestionResponseDTO {
    private int questionId;
    private String text;
    private int testId;
    private List<AnswerDTO> answers;
}
