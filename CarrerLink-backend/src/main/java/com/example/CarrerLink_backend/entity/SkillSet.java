package com.example.CarrerLink_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "skillset")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SkillSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int skillId;

    private String skillName;

    private String skillLevel;

    @ManyToOne
    @JoinColumn(name = "student_Id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "cv_id")
    private CV cv;



//    @ManyToMany(mappedBy = "skills")
//    private List<AcedemicResults> acedemicResults;
}
