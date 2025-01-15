package com.example.CarrerLink_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reviews")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    private String reviewerName;

    private String review;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company companies;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student students;

}
