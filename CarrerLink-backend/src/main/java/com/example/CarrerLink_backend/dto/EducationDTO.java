package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EducationDTO {
    private int id;
    private String degree;
    private String institution;
    private String location;
    private String startDate;
    private String endDate;
    private double gpa;
    private String description;
}
