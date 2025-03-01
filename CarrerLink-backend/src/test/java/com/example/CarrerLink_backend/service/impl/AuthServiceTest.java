package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.request.LoginRequestDTO;
import com.example.CarrerLink_backend.dto.request.RegisterRequestDTO;
import com.example.CarrerLink_backend.dto.response.LoginResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.repo.RoleRepo;
import com.example.CarrerLink_backend.repo.UserRepo;
import com.example.CarrerLink_backend.service.CompanyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private  ModelMapper modelMapper;

    @Mock
    private  UserRepo userRepo;

    @Mock
    private  PasswordEncoder passwordEncoder;

    @Mock
    private  AuthenticationManager authenticationManager;


    @Mock
    private JWTService jwtService;


    @Mock
    private  RoleRepo roleRepo;

    @Mock
    private  StudentServiceImpl studentService;
    @Mock
    private  CompanyService companyService;

    @InjectMocks
    private AuthService authService;


    private RegisterRequestDTO registerRequestDTO;
    private UserEntity userEntity;
    private LoginRequestDTO loginRequestDTO;
    private LoginResponseDTO loginResponseDTO;
    @BeforeEach
    void setUp() {
        registerRequestDTO = new RegisterRequestDTO();
        registerRequestDTO.setUsername("sasa");
        registerRequestDTO.setPassword("sasa123");
        registerRequestDTO.setEmail("sasa@gmail.com");


        userEntity = new UserEntity();
        userEntity.setUsername("sasa");
        userEntity.setPassword("sasa123");
        userEntity.setEmail("sasa@gmail.com");
        userEntity.setRole("ROLE_STUDENT");

        loginRequestDTO = new LoginRequestDTO();
        loginRequestDTO.setUsername("sasa");
        loginRequestDTO.setPassword("sasa123");


    }

    @Test
    void should_successfully_create_user(){
        //Arrange
        when(modelMapper.map(registerRequestDTO, UserEntity.class)).thenReturn(userEntity);
        when(userRepo.save(userEntity)).thenReturn(userEntity);
        when(passwordEncoder.encode(registerRequestDTO.getPassword())).thenReturn("hashedPassword");

        //Act
        UserEntity result = authService.createUser(registerRequestDTO);

        //Assert
        assertEquals(userEntity.getUsername(),result.getUsername());
        assertEquals("hashedPassword",result.getPassword());

    }

    @Test
    void testLogin_Success() {
        //Arrange

        Map<String,Object> claims = new HashMap<String,Object>();
        claims.put("role",userEntity.getRole());
        claims.put("email",userEntity.getEmail());
        claims.put("userId",userEntity.getId());
        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(),loginRequestDTO.getPassword()))).thenReturn(null);
        when(userRepo.findByUsername(loginRequestDTO.getUsername())).thenReturn(userEntity);
        when(jwtService.getJWTToken(loginRequestDTO.getUsername(),claims)).thenReturn("token");

        //Act
        LoginResponseDTO result = authService.login(loginRequestDTO);

        //Assert
        assertEquals("token",result.getToken());
        assertEquals("token generate success",result.getMessage());




    }

    @Test
    void should_throw_exception_user_notFound(){

    }



}