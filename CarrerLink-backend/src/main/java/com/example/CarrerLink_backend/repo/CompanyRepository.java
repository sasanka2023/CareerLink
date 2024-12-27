package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByLocationAndCategory(String location, String category);
    List<Company> findByNameContainingIgnoreCase(String name);
}
