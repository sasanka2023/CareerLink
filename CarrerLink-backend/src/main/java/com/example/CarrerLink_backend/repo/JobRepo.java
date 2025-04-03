package com.example.CarrerLink_backend.repo;


import com.example.CarrerLink_backend.entity.Company;
import com.example.CarrerLink_backend.entity.Job;
import com.example.CarrerLink_backend.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface JobRepo extends JpaRepository<Job,Integer> {

    List<Job> findByJobTypeAndCompanyNameEquals(String jobType, String company);

    List<Job> findByCompanyName(String company);

    List<Job> findByJobType(String jobType);

    Optional<Job> findByJobId(int jobId);

    List<Job> findByCompany(Company company);

    List<Job> findByCompany_Id(Long companyId);



    @Query("SELECT DISTINCT j FROM Job j LEFT JOIN FETCH j.technologies WHERE EXISTS (SELECT t FROM j.technologies t WHERE LOWER(t.techName) IN :techNames)")
    List<Job> findJobsWithMatchingTechnologies(@Param("techNames") List<String> techNames);





}
