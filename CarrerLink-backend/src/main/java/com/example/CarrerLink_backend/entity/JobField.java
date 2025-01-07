package com.example.CarrerLink_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "jobfield")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobFieldId;

    private String jobField;

    @ManyToMany(mappedBy = "jobsFields")
    private List<Student> students;

}
