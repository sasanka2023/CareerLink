package com.example.CarrerLink_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Table(name = "acedemic_results")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AcedemicResults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resultId;

    private String course;
    private String result;
    private String skillLevel;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student students;

}
