package com.example.CarrerLink_backend.dto;

public class AnswerDTO package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnswerDTO {
    private int id;
    private String text;
    private boolean isCorrect;
    private int questionId;
}
{
}
