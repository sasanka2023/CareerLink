package com.example.CarrerLink_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cource")
@AllArgsConstructor
@NoArgsConstructor
@Data
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

    private String url;

}
