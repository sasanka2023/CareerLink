package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // Add any other fields that might be needed

    @OneToMany(mappedBy = "createdBy")
    private java.util.List<SkillTest> createdTests;
}
