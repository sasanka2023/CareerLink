package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.request.LoginRequestDTO;
import com.example.CarrerLink_backend.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;

import static org.junit.jupiter.api.Assertions.*;

class AuthServiceTest {

    @Mock
    private  ModelMapper modelMapper;

    @Mock
    private  UserRepo userRepo;

    @Mock
    private  AuthenticationManager authenticationManager;
    @InjectMocks
    private AuthService authService;

    @Test
    void should_successfully_login_as_user() {
        LoginRequestDTO loginRequestDTO = new LoginRequestDTO("sasanka","sasanka123");

    }

}