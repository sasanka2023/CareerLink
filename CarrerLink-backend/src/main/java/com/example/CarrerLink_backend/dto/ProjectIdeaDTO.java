package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectIdeaDTO {
    private String title;
    private String description;
    private List<String> technologies;
    private String difficulty;
}