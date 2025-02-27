package com.example.CarrerLink_backend.dto.response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobApproveResponseDTO {


    private int id;
    private LocalDate interviewDate;  // Store interview date
    private Boolean status;
}
