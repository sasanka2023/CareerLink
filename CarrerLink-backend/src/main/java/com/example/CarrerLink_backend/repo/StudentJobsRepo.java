package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Job;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.entity.StudentJobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface StudentJobsRepo extends JpaRepository<StudentJobs,Integer> {


    boolean existsByStudentAndJob(Student student, Job job);

    List<StudentJobs> findByStudent(Student student);

    List<StudentJobs> findByJob(Job job);

    StudentJobs findByStudentAndJob(Student student, Job job);

    List<StudentJobs> findByStatusTrueAndJob_JobId( int jobJobId);

}
