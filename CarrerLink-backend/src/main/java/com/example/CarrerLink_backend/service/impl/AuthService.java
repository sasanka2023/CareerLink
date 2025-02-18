package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.LoginRequestDTO;
import com.example.CarrerLink_backend.dto.request.RegisterRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.response.LoginResponseDTO;
import com.example.CarrerLink_backend.dto.response.RegisterResponseDTO;
import com.example.CarrerLink_backend.entity.Role;
import com.example.CarrerLink_backend.entity.RolesEntity;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.repo.RoleRepo;
import com.example.CarrerLink_backend.repo.UserRepo;
import com.example.CarrerLink_backend.service.CompanyService;
import lombok.AllArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final RoleRepo roleRepo;
    private final StudentServiceImpl studentService;
    private final CompanyService companyService;

    public List<UserEntity> getAllUsers(){
        return userRepo.findAll();
    }

    public UserEntity createUser(RegisterRequestDTO userEntity){
        UserEntity newuser = modelMapper.map(userEntity, UserEntity.class);
        newuser.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        return userRepo.save(newuser);

    }
    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(),loginRequestDTO.getPassword()));
        }catch(Exception e){
            return new LoginResponseDTO(null,null,"user not found","error",null);

        }

        UserEntity user = userRepo.findByUsername(loginRequestDTO.getUsername());


        Map<String,Object> claims = new HashMap<String,Object>();
        claims.put("role",user.getRole());
        claims.put("email",user.getEmail());
        claims.put("userId",user.getId());
        String token = jwtService.getJWTToken(loginRequestDTO.getUsername(),claims);

        System.out.println(jwtService.getFieldFromToken(token,"role"));
        return new LoginResponseDTO(token, LocalDateTime.now(),null,"token generate success",user.getUsername());

    }
//    @Transactional
//    public RegisterResponseDTO register(RegisterRequestDTO registerRequestDTO){
//        if(isUserEnable(registerRequestDTO.getUsername())) return new RegisterResponseDTO(null,"user allready exists in the System");
//        UserEntity userData = this.createUser(registerRequestDTO);
//        if(userData.getId() == 0) return new RegisterResponseDTO(null,"system error");
//        return new RegisterResponseDTO(String.format("user registers at %s",userData.getId()),null);
//    }
    @Transactional
    public RegisterResponseDTO registerStudent(StudentSaveRequestDTO studentSaveRequestDTO) throws IllegalAccessException {
        if(Boolean.TRUE.equals(isUserEnable(studentSaveRequestDTO.getUserSaveRequestDTO().getUsername()))) {
            throw new IllegalAccessException("User already exists in the System");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setName(studentSaveRequestDTO.getFirstName()+" "+studentSaveRequestDTO.getLastName());
        userEntity.setEmail(studentSaveRequestDTO.getEmail());
        userEntity.setUsername(studentSaveRequestDTO.getUserSaveRequestDTO().getUsername());
        userEntity.setPassword(passwordEncoder.encode(studentSaveRequestDTO.getUserSaveRequestDTO().getPassword()));
        RolesEntity studentRole = roleRepo.findByName("ROLE_STUDENT").orElseThrow(() ->new RuntimeException("Role not found"));
        userEntity.setRole(studentRole.getName());
        UserEntity userData = userRepo.save(userEntity);
        studentService.saveStudent(studentSaveRequestDTO,userData);


        if(userData.getId() == 0) return new RegisterResponseDTO(null,"system error");
        return new RegisterResponseDTO(String.format("user registers at %s",userData.getId()),null);
    }
    @Transactional
    public RegisterResponseDTO registerCompany(CompanySaveRequestDTO companySaveRequestDTO) throws IllegalAccessException {
        if(Boolean.TRUE.equals(isUserEnable(companySaveRequestDTO.getUserSaveRequestDTO().getUsername()))) {
            throw new IllegalAccessException("User already exists in the System");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setName(companySaveRequestDTO.getName());
        userEntity.setEmail(companySaveRequestDTO.getEmail());
        userEntity.setUsername(companySaveRequestDTO.getUserSaveRequestDTO().getUsername());
        userEntity.setPassword(passwordEncoder.encode(companySaveRequestDTO.getUserSaveRequestDTO().getPassword()));
        RolesEntity companyRole = roleRepo.findByName("ROLE_COMPANY").orElseThrow(()->new RuntimeException("Role not found"));
        userEntity.setRole(companyRole.getName());
        UserEntity userData = userRepo.save(userEntity);
        companyService.saveCompany(companySaveRequestDTO,userData);


        if(userData.getId() == 0) return new RegisterResponseDTO(null,"system error");
        return new RegisterResponseDTO(String.format("user registers at %s",userData.getId()),null);
    }



    private Boolean isUserEnable(String username){
        return userRepo.findByUsername(username)!=null;

    }

    public RolesEntity createRoles(RolesEntity rolesEntity) {
        return roleRepo.save(rolesEntity);
    }
}
