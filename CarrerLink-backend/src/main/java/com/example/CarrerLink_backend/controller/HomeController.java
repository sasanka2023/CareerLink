package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.service.impl.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class HomeController {

    private final JWTService jwtService;

    @PostMapping("/login")
    public String login(){
        return null;
    }

    @GetMapping("/username")
    public String getUsername(@RequestParam String token){
        return jwtService.getUsername(token);
    }
}
