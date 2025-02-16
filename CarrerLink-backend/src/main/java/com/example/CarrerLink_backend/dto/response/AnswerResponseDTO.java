package com.example.CarrerLink_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnswerResponseDTO {
    private int answerId;
    private String text;
    private boolean isCorrect;
    private int questionId;
}
