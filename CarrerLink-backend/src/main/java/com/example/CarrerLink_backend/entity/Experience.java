package com.example.CarrerLink_backend.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="experience")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String jobTitle;
    private String companyName;
    private String startDate;
    private String endDate;
    private String description;

    @ManyToOne
    @JoinColumn(name="cv_id")

    private CV cv;
}
