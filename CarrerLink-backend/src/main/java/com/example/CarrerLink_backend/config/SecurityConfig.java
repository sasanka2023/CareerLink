package com.example.CarrerLink_backend.config;

import com.example.CarrerLink_backend.filter.JWTFilter;
import com.example.CarrerLink_backend.repo.UserRepo;
import com.example.CarrerLink_backend.service.impl.CustomUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepo userRepo;
    private final JWTFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(c -> c.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(s -> s
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(r -> r
                        // Public endpoints
                        .requestMatchers(
                                "/api/auth/login",
                                "/api/auth/register/company",
                                "/api/auth/register/student",
                                "/api/auth/register/admin",
                                "/api/auth/CreateRoles",
                                "/api/notifications/**",
                                "/ws/**",
                                "/api/v1/acedemicCourses/filter"
                        ).permitAll()

                        // Public GET endpoints
                        .requestMatchers("GET", "/api/companies/**").permitAll()
                        .requestMatchers("GET", "/api/jobs/**").permitAll()
                        .requestMatchers("PUT", "/api/students/**").permitAll()

                        // Company role endpoints
                        .requestMatchers("POST", "/api/companies/**").hasRole("COMPANY")
                        .requestMatchers("PUT", "/api/companies/**").hasRole("COMPANY")
                        .requestMatchers("DELETE", "/api/companies/**").hasRole("COMPANY")

                        // Student role endpoints
                        .requestMatchers("GET", "/api/students/**").hasRole("STUDENT")
                        .requestMatchers("/api/students/**").hasRole("STUDENT")

                        // Test-related endpoints
                        .requestMatchers("GET", "/api/tests/**").hasAnyRole("SUPERADMIN", "STUDENT") // Allow students and superadmins to view tests
                        .requestMatchers("POST", "/api/tests/**").hasRole("SUPERADMIN") // Only superadmins can create tests
                        .requestMatchers("PUT", "/api/tests/**").hasRole("SUPERADMIN") // Only superadmins can update tests
                        .requestMatchers("DELETE", "/api/tests/**").hasRole("SUPERADMIN") // Only superadmins can delete tests
                        .requestMatchers("/api/enrollments/**").hasRole("STUDENT") // Only students can enroll

                        // Admin role endpoints
                        .requestMatchers("/api/admin/**").hasAnyRole("ADMIN", "SUPERADMIN")

                        // Authenticated endpoints (no specific role)
                        .requestMatchers("/api/cv/**", "/api/v1/requiredCourses/**", "/api/admin").authenticated()

                        // Catch-all rule
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider())
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService(userRepo);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}