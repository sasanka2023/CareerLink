package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface AnswerRepo extends JpaRepository<Answer, Integer> {

    List<Answer> findByQuestionId(Integer questionId);
}
