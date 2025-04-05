package com.example.CarrerLink_backend.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApplicantDetailsgetResponseDTO {
    private int studentId;
    private String firstName;
    private String lastName;
    private Boolean status;
    private String university;
    private LocalDate interviewDate;
    private String jobFieldName;





}
