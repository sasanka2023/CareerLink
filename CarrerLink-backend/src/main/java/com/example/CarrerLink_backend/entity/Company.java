package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="companies")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String logo;
    private String description;
    private String category;
    private String mobile;
    private String location;
    private String coverImage;
    private String email;
    private String requirements;
    private String website;

    // One-to-Many relationship with Job entity
    //@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)

    @ManyToMany
    @JoinTable(
            name = "company_clients",
            joinColumns = @JoinColumn(name = "company_id"),
            inverseJoinColumns = @JoinColumn(name = "client_id")
    )
    private List<Client> clients;

    @OneToMany(mappedBy = "company",cascade = CascadeType.ALL)
    private List<Job> jobs;

    @ManyToMany
    @JoinTable(
            name = "company_technologies",
            joinColumns = @JoinColumn(name = "company_id"),
            inverseJoinColumns = @JoinColumn(name = "tech_id")
    )
    private List<Technology> technologies;

    @OneToMany(mappedBy = "companies",cascade = CascadeType.ALL)
    private List<Review> reviews;


    @OneToMany(mappedBy = "company",cascade = CascadeType.ALL)
    private List<Products> products;

}
