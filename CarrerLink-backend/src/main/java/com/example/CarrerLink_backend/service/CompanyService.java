package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.CompanyUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.CompanygetResponseDTO;

import java.util.List;

public interface CompanyService {
    List<CompanygetResponseDTO> getCompanies(String location, String category);
    List<CompanygetResponseDTO> getAllCompanies();

    List<CompanygetResponseDTO> searchCompanyByName(String name);
    String saveCompany(CompanySaveRequestDTO companySaveRequestDTO);
    String updateCompany(CompanyUpdateRequestDTO company);
    void deleteCompany(Long id);
}

