package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.dto.request.LoginRequestDTO;
import com.example.CarrerLink_backend.dto.request.RegisterRequestDTO;
import com.example.CarrerLink_backend.dto.response.LoginResponseDTO;
import com.example.CarrerLink_backend.dto.response.RegisterResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.service.impl.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;


    @GetMapping
    public List<UserEntity> getAllUsers(){
        return authService.getAllUsers();
    }

    @PostMapping
    public UserEntity createUser(@RequestBody RegisterRequestDTO userEntity){
        return authService.createUser(userEntity);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){

        LoginResponseDTO res = authService.login(loginRequestDTO);
        if(res.getError()!=null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO registerRequestDTO){

        RegisterResponseDTO res = authService.register(registerRequestDTO);
        if(res.getError()!=null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
