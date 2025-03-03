package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Add any custom query methods if needed
}
