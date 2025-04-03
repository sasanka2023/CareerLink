package com.example.CarrerLink_backend.config;

import com.example.CarrerLink_backend.entity.RolesEntity;
import com.example.CarrerLink_backend.repo.RoleRepo;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@AllArgsConstructor
public class RoleInitializer implements CommandLineRunner {

private final RoleRepo roleRepo;


    @Override
    public void run(String... args) throws Exception {
        List<String> roles = Arrays.asList("ROLE_STUDENT", "ROLE_COMPANY", "ROLE_ADMIN");

        for (String roleName : roles) {
            if (roleRepo.findByName(roleName).isEmpty()) {
                roleRepo.save(new RolesEntity(0, roleName));
                System.out.println("Created Role: " + roleName);
            }
        }
    }
}
