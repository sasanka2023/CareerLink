package com.example.CarrerLink_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cource")
public class RequiredCources {
    @Id
    @Column(name = "cource_id",length = 45)
    private int courceId;

    @Column(name = "cource_name",length = 100,nullable = false)
    private String courceName;

    @Column(name = "required_skill",length = 100)
    private String requiredSkill;

    @Column(name = "skill_level",length = 100,nullable = false)
    private String skillLevel;

    @Override
    public String toString() {
        return "RequiredCources{" +
                "courceId=" + courceId +
                ", courceName='" + courceName + '\'' +
                ", requiredSkill='" + requiredSkill + '\'' +
                ", skillLevel='" + skillLevel + '\'' +
                '}';
    }

    public void setCourceId(int courceId) {
        this.courceId = courceId;
    }

    public void setCourceName(String courceName) {
        this.courceName = courceName;
    }

    public void setRequiredSkill(String requiredSkill) {
        this.requiredSkill = requiredSkill;
    }

    public void setSkillLevel(String skillLevel) {
        this.skillLevel = skillLevel;
    }

    public int getCourceId() {
        return courceId;
    }

    public String getCourceName() {
        return courceName;
    }

    public String getRequiredSkill() {
        return requiredSkill;
    }

    public String getSkillLevel() {
        return skillLevel;
    }

    public RequiredCources(int courceId, String courceName, String requiredSkill, String skillLevel) {
        this.courceId = courceId;
        this.courceName = courceName;
        this.requiredSkill = requiredSkill;
        this.skillLevel = skillLevel;
    }

    public RequiredCources() {

    }
}
