package com.example.CarrerLink_backend.dto;

import com.example.CarrerLink_backend.dto.response.JobgetResponseDTO;
import com.example.CarrerLink_backend.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobRecommendationDTO {

    private JobgetResponseDTO job;
    private double score;
    private String message;
}
