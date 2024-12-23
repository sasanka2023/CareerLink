package com.example.CarrerLink_backend.dto;

import jakarta.persistence.Column;

public class RequireCoursesDTO {

    private int courceId;
    private String courceName;
    private String requiredSkill;
    private String skillLevel;

    public RequireCoursesDTO() {

    }

    public RequireCoursesDTO(int courceId, String courceName, String requiredSkill, String skillLevel) {
        this.courceId = courceId;
        this.courceName = courceName;
        this.requiredSkill = requiredSkill;
        this.skillLevel = skillLevel;
    }

    public int getCourceId() {
        return courceId;
    }

    public void setCourceId(int courceId) {
        this.courceId = courceId;
    }

    public String getCourceName() {
        return courceName;
    }

    public void setCourceName(String courceName) {
        this.courceName = courceName;
    }

    public String getRequiredSkill() {
        return requiredSkill;
    }

    public void setRequiredSkill(String requiredSkill) {
        this.requiredSkill = requiredSkill;
    }

    public String getSkillLevel() {
        return skillLevel;
    }

    public void setSkillLevel(String skillLevel) {
        this.skillLevel = skillLevel;
    }

    @Override
    public String toString() {
        return "RequireCoursesDTO{" +
                "courceId=" + courceId +
                ", courceName='" + courceName + '\'' +
                ", requiredSkill='" + requiredSkill + '\'' +
                ", skillLevel='" + skillLevel + '\'' +
                '}';
    }
}
