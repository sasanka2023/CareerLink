package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExperienceDTO {
    private int id;

    private String jobTitle;
    private String companyName;
    private String startDate;
    private String endDate;
    private String description;

}
