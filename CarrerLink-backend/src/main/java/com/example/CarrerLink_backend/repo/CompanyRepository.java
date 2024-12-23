package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Company;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>{
    @Query("SELECT c FROM Company c WHERE (:location IS NULL OR c.location = :location) AND (:category IS NULL OR c.category = :category)")
    Page<Company> findByLocationAndCategory(String location, String category, Pageable pageable);

}
