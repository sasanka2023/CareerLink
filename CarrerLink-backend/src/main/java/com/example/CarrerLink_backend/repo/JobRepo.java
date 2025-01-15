package com.example.CarrerLink_backend.repo;


import com.example.CarrerLink_backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface JobRepo extends JpaRepository<Job,Integer> {

    List<Job> findByJobTypeAndCompanyNameEquals(String jobType, String company);

    List<Job> findByCompanyName(String company);

    List<Job> findByJobType(String jobType);
}
