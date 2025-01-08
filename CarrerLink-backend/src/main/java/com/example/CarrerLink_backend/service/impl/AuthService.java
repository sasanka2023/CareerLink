package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.dto.request.LoginRequestDTO;
import com.example.CarrerLink_backend.dto.request.RegisterRequestDTO;
import com.example.CarrerLink_backend.dto.response.LoginResponseDTO;
import com.example.CarrerLink_backend.dto.response.RegisterResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.repo.UserRepo;
import lombok.AllArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class AuthService {


    private final ModelMapper modelMapper;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public List<UserEntity> getAllUsers(){
        return userRepo.findAll();
    }

    public UserEntity createUser(RegisterRequestDTO userEntity){
        UserEntity newuser = modelMapper.map(userEntity, UserEntity.class);
        newuser.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        return userRepo.save(newuser);

    }
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO){
  //      Boolean userPresent = isUserEnable(loginRequestDTO.getUsername());
    //    if(!userPresent) return new LoginResponseDTO(null,null,"user not found","error");
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(),loginRequestDTO.getPassword()));
        }catch(Exception e){
            return new LoginResponseDTO(null,null,"user not found","error");

        }
        Map<String,Object> claims = new HashMap<String,Object>();
        claims.put("role","User");
        claims.put("email","company@gmail.com");
        String token = jwtService.getJWTToken(loginRequestDTO.getUsername(),claims);

        System.out.println(jwtService.getFieldFromToken(token,"role"));
        return new LoginResponseDTO(token, LocalDateTime.now(),null,"token generate success");

    }

    public RegisterResponseDTO register(RegisterRequestDTO registerRequestDTO){
        if(isUserEnable(registerRequestDTO.getUsername())) return new RegisterResponseDTO(null,"user allready exists in the System");
        UserEntity userData = this.createUser(registerRequestDTO);
        if(userData.getId() == 0) return new RegisterResponseDTO(null,"system error");
        return new RegisterResponseDTO(String.format("user registers at %s",userData.getId()),null);
    }

    private Boolean isUserEnable(String username){
        return userRepo.findByUsername(username)!=null;

    }

}
