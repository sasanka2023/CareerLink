package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "student_job")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentJobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @Column(name = "interview_date")
    private LocalDate interviewDate;  // Store interview date

    @Column(name = "status",columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean status = false;

}
