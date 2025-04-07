package com.example.CarrerLink_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TechnicalSkills {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String techSkill;
    private String category;
    @ManyToOne
    @JoinColumn(name="cv_id")

    private CV cv;
}
