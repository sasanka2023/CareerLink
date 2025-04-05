package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findBySkillTestId(Long skillTestId);
}
