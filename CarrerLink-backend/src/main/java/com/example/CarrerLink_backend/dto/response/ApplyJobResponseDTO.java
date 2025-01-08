package com.example.CarrerLink_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApplyJobResponseDTO {
    private int jobId;
    private String jobTitle;
}
