package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Basic CRUD operations are inherited from JpaRepository
    // You can add custom query methods here if needed
}
