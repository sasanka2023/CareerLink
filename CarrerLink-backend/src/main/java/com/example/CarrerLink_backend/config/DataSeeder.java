package com.example.CarrerLink_backend.config;

import com.example.CarrerLink_backend.entity.Admin;
import com.example.CarrerLink_backend.entity.Role;
import com.example.CarrerLink_backend.entity.RolesEntity;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.repo.AdminRepo;
import com.example.CarrerLink_backend.repo.RoleRepo;
import com.example.CarrerLink_backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder implements CommandLineRunner{
    @Autowired
    private UserRepo userRepository;

    @Autowired
    private AdminRepo adminRepository;

    @Autowired
    private RoleRepo roleRepo;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) throws Exception {
        // Predefined Super Admin username and email
        String superAdminUsername = "superadmin";
        String superAdminEmail = "superadmin@example.com";

        // Check if the super admin already exists
        if (userRepository.findByUsername(superAdminUsername) == null) {
            // Create UserEntity for Super Admin
            UserEntity superAdminUser = new UserEntity();
            superAdminUser.setName("Super Admin");
            superAdminUser.setEmail(superAdminEmail);
            superAdminUser.setUsername(superAdminUsername);
            // Hash the password before saving it
            superAdminUser.setPassword(passwordEncoder.encode("@CarrerLink"));
            RolesEntity suppadminrole = roleRepo.findByName("ROLE_SUPERADMIN").orElseThrow(()->new RuntimeException("Role not found"));
            superAdminUser.setRole(suppadminrole.getName());

            superAdminUser.setIsEnabled(true);

            // Save the user first so we have a reference
            UserEntity savedUser = userRepository.save(superAdminUser);

            // Create the Admin record and link it to the saved user
            Admin superAdmin = new Admin();
            superAdmin.setFullName("Super Admin");
            superAdmin.setEmail(superAdminEmail);
            superAdmin.setProfession("System Administrator");
            // For a super admin, you might automatically set status as approved (true)
            superAdmin.setStatus(true);
            superAdmin.setUser(savedUser);

            adminRepository.save(superAdmin);

            System.out.println("Super Admin created successfully.");
        } else {
            System.out.println("Super Admin already exists.");
        }
    }
}