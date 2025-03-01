package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {


    private final UserRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntityData = userRepo.findByUsername(username);
        return User.builder()
                .username(userEntityData.getUsername())
                .password(userEntityData.getPassword())
                .build();
    }
}
