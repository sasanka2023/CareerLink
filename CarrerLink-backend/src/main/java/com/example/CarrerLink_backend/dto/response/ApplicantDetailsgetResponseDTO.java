package com.example.CarrerLink_backend.dto.response;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApplicantDetailsgetResponseDTO {
    private int studentId;
    private String firstName;
    private String lastName;
    private Boolean status;
    private String university;
    @JsonFormat(
            pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX",
            timezone = "UTC"
    )
    private OffsetDateTime  interviewDate;
    private String jobFieldName;





}
