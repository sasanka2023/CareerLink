package com.example.CarrerLink_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Certification {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String name;
    private String organization;
    private String issueDate;
    private String certificationLink;
    @ManyToOne
    @JoinColumn(name= "cv_id")

    private CV cv;
}
