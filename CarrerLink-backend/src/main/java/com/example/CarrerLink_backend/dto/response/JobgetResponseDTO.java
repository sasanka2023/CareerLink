package com.example.CarrerLink_backend.dto.response;


import com.example.CarrerLink_backend.dto.TechnologyDTO;
import com.example.CarrerLink_backend.entity.JobStatus;
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

    private JobStatus status;
    private int rate;
    private String location;
    private List<TechnologyDTO> technologies;
    private String companyName;



}
