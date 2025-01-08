package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface UserRepo extends JpaRepository<UserEntity, Integer> {
    UserEntity findByUsername(String name);
}
