package com.example.CarrerLink_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="education")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Education {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String degree;
    private String institution;
    private String location;
    private String startDate;
    private String endDate;
    private double gpa;
    private String description;
    @ManyToOne
    @JoinColumn(name= "cv_id")

    private CV cv;
}
