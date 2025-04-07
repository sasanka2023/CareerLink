package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CertificationDTO {
    private int id;
    private String name;
    private String organization;
    private String issueDate;
    private String certificationLink;
}
