package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.awt.event.ComponentAdapter;
import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByLocationAndCategory(String location, String category);
    List<Company> findByNameContainingIgnoreCase(String name);
    List<Company> findByLocation(String location);
    List<Company> findByCategory(String category);

    Optional<Company> findByName(String name);

    Optional<Company> findByUser_Id(int userId);



}
