package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface ProfileImageRepo extends JpaRepository<ProfileImage, Integer> {
    Optional<ProfileImage> findByUserId(int userId);

    @Query("SELECT p.url FROM profile_image p WHERE p.user.id = :userId") // Ensure it returns only the URL
    Optional<String> findUrlByUserId(@Param("userId") int userId);
}



