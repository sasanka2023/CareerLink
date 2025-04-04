package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.Admin;
import com.example.CarrerLink_backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface AdminRepo extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByUser_Id(int userId);

    Optional<Admin> findByUserName(String userName);

    Optional<Admin> findByUser(UserEntity user);
}
