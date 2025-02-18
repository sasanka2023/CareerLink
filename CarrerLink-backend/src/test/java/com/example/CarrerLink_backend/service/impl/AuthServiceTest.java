//package com.example.CarrerLink_backend.service.impl;
//
//import com.example.CarrerLink_backend.dto.request.LoginRequestDTO;
//import com.example.CarrerLink_backend.dto.request.RegisterRequestDTO;
//import com.example.CarrerLink_backend.entity.UserEntity;
//import com.example.CarrerLink_backend.repo.UserRepo;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.modelmapper.ModelMapper;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import static org.hamcrest.Matchers.any;
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//
//@ExtendWith(MockitoExtension.class)
//class AuthServiceTest {
//
//    @Mock
//    private  ModelMapper modelMapper;
//
//    @Mock
//    private  UserRepo userRepo;
//
//    @Mock
//    private  PasswordEncoder passwordEncoder;
//
//    @Mock
//    private  AuthenticationManager authenticationManager;
//    @InjectMocks
//    private AuthService authService;
//
//    @Test
//    void should_successfully_create_user(){
//        UserEntity newuser = new UserEntity(1,"sasanka","sasa@gmail.com","sasa","HashedPassword","ROLE_STUDENT",true);
//        RegisterRequestDTO registerRequestDTO = new RegisterRequestDTO("sasanka","sasa@gmail.com","sasa","sasa123");
//
//        //Mock the Calls
//        when(modelMapper.map(registerRequestDTO,UserEntity.class)).thenReturn(newuser);
//        when(passwordEncoder.encode(registerRequestDTO.getPassword())).thenReturn("HashedPassword");
//        when(userRepo.save(newuser)).thenReturn(newuser);
//
//        //act
//        UserEntity savedUser = authService.createUser(registerRequestDTO);
//
//        //assert
//        assertNotNull(savedUser);
//        assertEquals("sasa", savedUser.getUsername());
//
//        // Verify interactions
//        verify(modelMapper, times(1)).map(registerRequestDTO, UserEntity.class);
//        verify(passwordEncoder, times(1)).encode(registerRequestDTO.getPassword());
//
//    }
//
//    @Test
//    void should_successfully_login_as_user() {
//        LoginRequestDTO loginRequestDTO = new LoginRequestDTO("sasanka","sasanka123");
//
//    }
//
//}