package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.LoginRequestDTO;
import com.example.CarrerLink_backend.dto.request.RegisterRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.response.LoginResponseDTO;
import com.example.CarrerLink_backend.dto.response.RegisterResponseDTO;
import com.example.CarrerLink_backend.entity.RolesEntity;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.repo.RoleRepo;
import com.example.CarrerLink_backend.repo.UserRepo;
import com.example.CarrerLink_backend.service.CompanyService;
import com.example.CarrerLink_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Service class handling authentication and user registration operations.
 */
@Service
@AllArgsConstructor
public class AuthService {

    private final ModelMapper modelMapper;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final RoleRepo roleRepo;
    private final StudentService studentService; // Changed to interface
    private final CompanyService companyService;

    /**
     * Retrieves all users from the database.
     *
     * @return List of all UserEntity objects
     */
    public List<UserEntity> getAllUsers() {
        return userRepo.findAll();
    }

    /**
     * Creates a new user based on registration data.
     *
     * @param registerRequestDTO Registration request data
     * @return Saved UserEntity
     * @throws IllegalArgumentException if input is null
     */
    @Transactional
    public UserEntity createUser(RegisterRequestDTO registerRequestDTO) {
        Objects.requireNonNull(registerRequestDTO, "Register request cannot be null");

        UserEntity newUser = modelMapper.map(registerRequestDTO, UserEntity.class);
        newUser.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        return userRepo.save(newUser);
    }

    /**
     * Authenticates a user and generates a JWT token.
     *
     * @param loginRequestDTO Login request data
     * @return LoginResponseDTO containing authentication result
     * @throws IllegalArgumentException if input is null
     */
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        Objects.requireNonNull(loginRequestDTO, "Login request cannot be null");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getUsername(),
                            loginRequestDTO.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return new LoginResponseDTO(null, null, "Invalid username or password", "error", null);
        }

        UserEntity user = userRepo.findByUsername(loginRequestDTO.getUsername());
        if (user == null) {
            return new LoginResponseDTO(null, null, "User not found", "error", null);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        claims.put("email", user.getEmail());
        claims.put("userId", user.getId());
        String token = jwtService.getJWTToken(loginRequestDTO.getUsername(), claims);

        return new LoginResponseDTO(token, LocalDateTime.now(), null, "Token generated successfully", user.getUsername());
    }

    /**
     * Registers a new student user.
     *
     * @param studentSaveRequestDTO Student registration data
     * @return RegisterResponseDTO with registration result
     * @throws IllegalAccessException if user already exists
     * @throws IllegalArgumentException if input is invalid
     */
    @Transactional
    public RegisterResponseDTO registerStudent(StudentSaveRequestDTO studentSaveRequestDTO) throws IllegalAccessException {
        Objects.requireNonNull(studentSaveRequestDTO, "Student request cannot be null");
        Objects.requireNonNull(studentSaveRequestDTO.getUserSaveRequestDTO(), "User save request cannot be null");

        String username = studentSaveRequestDTO.getUserSaveRequestDTO().getUsername();
        if (Boolean.TRUE.equals(isUserEnable(username))) {
            throw new IllegalAccessException("User already exists in the system");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setName(studentSaveRequestDTO.getFirstName() + " " + studentSaveRequestDTO.getLastName());
        userEntity.setEmail(studentSaveRequestDTO.getEmail());
        userEntity.setUsername(username);
        userEntity.setPassword(passwordEncoder.encode(studentSaveRequestDTO.getUserSaveRequestDTO().getPassword()));

        RolesEntity studentRole = roleRepo.findByName("ROLE_STUDENT")
                .orElseThrow(() -> new IllegalStateException("ROLE_STUDENT not found"));
        userEntity.setRole(studentRole.getName());

        UserEntity savedUser = userRepo.save(userEntity);
        studentService.saveStudent(studentSaveRequestDTO, savedUser);

        if (savedUser.getId() == 0) {
            return new RegisterResponseDTO(null, "System error during user creation");
        }
        return new RegisterResponseDTO(String.format("User registered with ID %s", savedUser.getId()), null);
    }

    /**
     * Registers a new company user.
     *
     * @param companySaveRequestDTO Company registration data
     * @return RegisterResponseDTO with registration result
     * @throws IllegalAccessException if user already exists
     * @throws IllegalArgumentException if input is invalid
     */
    @Transactional
    public RegisterResponseDTO registerCompany(CompanySaveRequestDTO companySaveRequestDTO) throws IllegalAccessException {
        Objects.requireNonNull(companySaveRequestDTO, "Company request cannot be null");
        Objects.requireNonNull(companySaveRequestDTO.getUserSaveRequestDTO(), "User save request cannot be null");

        String username = companySaveRequestDTO.getUserSaveRequestDTO().getUsername();
        if (Boolean.TRUE.equals(isUserEnable(username))) {
            throw new IllegalAccessException("User already exists in the system");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setName(companySaveRequestDTO.getName());
        userEntity.setEmail(companySaveRequestDTO.getEmail());
        userEntity.setUsername(username);
        userEntity.setPassword(passwordEncoder.encode(companySaveRequestDTO.getUserSaveRequestDTO().getPassword()));

        RolesEntity companyRole = roleRepo.findByName("ROLE_COMPANY")
                .orElseThrow(() -> new IllegalStateException("ROLE_COMPANY not found"));
        userEntity.setRole(companyRole.getName());

        UserEntity savedUser = userRepo.save(userEntity);
        companyService.saveCompany(companySaveRequestDTO, savedUser);

        if (savedUser.getId() == 0) {
            return new RegisterResponseDTO(null, "System error during user creation");
        }
        return new RegisterResponseDTO(String.format("User registered with ID %s", savedUser.getId()), null);
    }

    /**
     * Checks if a username is already in use.
     *
     * @param username The username to check
     * @return true if user exists, false otherwise
     */
    private Boolean isUserEnable(String username) {
        Objects.requireNonNull(username, "Username cannot be null");
        return userRepo.findByUsername(username) != null;
    }

    /**
     * Creates a new role in the system.
     *
     * @param rolesEntity Role entity to create
     * @return Saved RolesEntity
     * @throws IllegalArgumentException if input is null
     */
    @Transactional
    public RolesEntity createRoles(RolesEntity rolesEntity) {
        Objects.requireNonNull(rolesEntity, "Roles entity cannot be null");
        return roleRepo.save(rolesEntity);
    }
}