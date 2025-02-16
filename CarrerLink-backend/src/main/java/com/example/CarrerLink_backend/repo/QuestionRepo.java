package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface QuestionRepo extends JpaRepository<Question, Integer> {

    List<Question> findByTestId(Integer testId);
}
