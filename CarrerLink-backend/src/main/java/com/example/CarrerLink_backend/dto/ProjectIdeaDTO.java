package com.example.CarrerLink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectIdeaDTO {
    private String title;
    private String description;
    private List<String> relatedSkills;
}