package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface TestRepo extends JpaRepository<Test, Integer> {

    Optional<Test> findByTitle(String title);
}
