package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentUpdateRequestDTO {
    private int StudentId;
    private String firstName;
    private String lastName;
    private String email;

    private String address;
    private String userName;
    private List<JobFieldDTO> jobsFields;
    private List<TechnologyDTO> technologies;

}
