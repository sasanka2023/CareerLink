package com.example.CarrerLink_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Jobs")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobId;

    private String requirements;
    private String jobTitle;
    private String jobType;
    private String description;

    private String companyName;
    private int rate;
    private String location;



    @ManyToMany
    @JoinTable(name = "Job_technologies",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "Tech_id"))
    private List<Technology> technologies;

    @ManyToMany(mappedBy = "jobs")
    private List<Student> students;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

}
