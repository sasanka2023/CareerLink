package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.dto.TechnologyStudentCount;
import com.example.CarrerLink_backend.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TechnologyRepo extends JpaRepository<Technology, Integer> {
    Optional<Technology> findByTechName(String name);  // Original case-sensitive method

    List<Technology> findByStudents_studentId(int studentId);

    @Query("SELECT t FROM Technology t LEFT JOIN FETCH t.students")
    List<Technology> findAllWithStudents();
}