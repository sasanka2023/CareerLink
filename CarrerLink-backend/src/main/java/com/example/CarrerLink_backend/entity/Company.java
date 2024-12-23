package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="companies")
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


    public Company() {
    }

    public Company(Long id, String name, String logo, String description, String category, String mobile, String location, String coverImage, String email, String requirements, String website) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.description = description;
        this.category = category;
        this.mobile = mobile;
        this.location = location;
        this.coverImage = coverImage;
        this.email = email;
        this.requirements = requirements;
        this.website = website;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", logo='" + logo + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", mobile='" + mobile + '\'' +
                ", location='" + location + '\'' +
                ", coverImage='" + coverImage + '\'' +
                ", email='" + email + '\'' +
                ", requirements='" + requirements + '\'' +
                ", website='" + website + '\'' +
                '}';
    }
}
