package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TechnologyRepo extends JpaRepository<Technology, Integer> {
    Optional<Technology> findByTechName(String name);  // Original case-sensitive method

    List<Technology> findByStudents_studentId(int studentId);
}