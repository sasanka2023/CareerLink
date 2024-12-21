package com.example.CarrerLink_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobgetResponseDTO {

    private int jobId;

    private String requirements;
    private String jobTitle;
    private String jobType;
    private String description;

    private String companyName;
    private int rate;
    private String location;
    private List<TechnologyDTO> technologies;
}
