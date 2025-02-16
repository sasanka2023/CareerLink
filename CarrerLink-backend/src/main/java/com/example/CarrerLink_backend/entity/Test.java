package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "test")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int testId;

    private String title;

    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    private List<Question> questions;
}
