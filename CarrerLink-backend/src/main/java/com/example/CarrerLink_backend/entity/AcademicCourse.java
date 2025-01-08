package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "acedemic_courses")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AcademicCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;
    private String courseName;

}
