package com.example.CarrerLink_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobFieldStudentCount {

    private String jobFieldName;
    private Integer studentCount;
}
