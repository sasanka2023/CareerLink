package com.example.CarrerLink_backend.dto.response;

import com.example.CarrerLink_backend.dto.QuestionDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TestResponseDTO {
    private int testId;
    private String title;
    private List<QuestionDTO> questions;
}
