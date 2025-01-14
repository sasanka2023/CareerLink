package com.example.CarrerLink_backend.filter;

import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.repo.UserRepo;
import com.example.CarrerLink_backend.service.impl.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@AllArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final UserRepo userRepo;

    @Override
    protected void doFilterInternal(@NonNull  HttpServletRequest request,@NonNull HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if(authorization==null){
            filterChain.doFilter(request, response);
            return;
        }

        if(!authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwt_token = authorization.split(" ")[1];
        String username = jwtService.getUsername(jwt_token);
        if(username == null) {
            filterChain.doFilter(request, response);
            return;
        }

        UserEntity userData = userRepo.findByUsername(username);
        if(userData == null){
            filterChain.doFilter(request, response);
            return;
        }

        if(SecurityContextHolder.getContext().getAuthentication()!= null){
            filterChain.doFilter(request, response);
            return;
        }
        String role = (String) jwtService.getFieldFromToken(jwt_token,"role");
        UserDetails userDetails = User.builder()
                .username(userData.getUsername())
                .password(userData.getPassword())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority(role)))
                .build();
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

        token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(token);
        System.out.println(jwt_token);
        filterChain.doFilter(request, response);
    }
}
