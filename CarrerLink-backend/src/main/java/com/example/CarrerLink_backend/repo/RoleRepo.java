package com.example.CarrerLink_backend.repo;


import com.example.CarrerLink_backend.entity.RolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import javax.management.relation.Role;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface RoleRepo extends JpaRepository<RolesEntity,Integer> {

    Optional<RolesEntity> findByName(String name);

}
