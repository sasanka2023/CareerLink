package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.CompanyDTO;

import java.util.List;

public interface CompanyService {
    List<CompanyDTO> getCompanies(String location, String category);
    List<CompanyDTO> getAllCompanies();
}

