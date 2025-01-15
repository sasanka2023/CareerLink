package com.example.CarrerLink_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int StudentId;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String userName;


    @ManyToMany
    @JoinTable(
            name = "appied_jobs",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "jobfield_id")
    )
    private List<JobField> jobsFields;


    @OneToMany(mappedBy = "students",cascade = CascadeType.ALL)
    private List<SkillSet> skills;

    @ManyToMany
    @JoinTable(
            name = "student_techs",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "tech_id")
    )
    private List<Technology> technologies;

    @OneToMany(mappedBy = "students",cascade = CascadeType.ALL)
    private List<AcedemicResults> acedemicResults;

    private String university;
    private String department;
    private String degree;

    @OneToMany(mappedBy = "students",cascade = CascadeType.ALL)
    private List<Review> reviews;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cv_id")
    private CV cv;

    @ManyToMany
    @JoinTable(
            name = "student_job", // This is the table name
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "job_id")
    )
    private List<Job> jobs;

    public void addJob(Job job) {
        jobs.add(job);
        job.getStudents().add(this);
    }

    public String toString(){
        return "Student{" +"cvId" +(cv != null ? cv.getId() : "null") + '}';
    }

}
