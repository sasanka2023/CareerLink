package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private String fullName;

    private String email;

    private String profession;

    private boolean status;
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
