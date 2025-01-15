package com.example.CarrerLink_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SkillSetDTO {

    private int skillId;

    private String skillName;

    private String skillLevel;
}
