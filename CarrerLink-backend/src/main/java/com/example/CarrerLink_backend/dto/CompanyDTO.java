package com.example.CarrerLink_backend.dto;

public class CompanyDTO {

    private String name;
    private String description;
    private String category;
    private String location;
    private String email;

    public CompanyDTO() {
    }

    // Constructor
    public CompanyDTO(String name, String description, String category, String location, String email) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.location = location;
        this.email = email;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getLocation() {
        return location;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "CompanyDTO{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", location='" + location + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

