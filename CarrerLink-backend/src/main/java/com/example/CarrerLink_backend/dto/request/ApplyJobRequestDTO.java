package com.example.CarrerLink_backend.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApplyJobRequestDTO {
    private int studentId;
    private int jobId;
}
