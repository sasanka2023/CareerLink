package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.CompanyUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;

import java.util.List;

public interface CompanyService {
    List<CompanygetResponseDTO> getCompanies(String location, String category);
    List<CompanygetResponseDTO> getAllCompanies();

    List<CompanygetResponseDTO> searchCompanyByName(String name);
    String saveCompany(CompanySaveRequestDTO companySaveRequestDTO);
    String updateCompany(CompanyUpdateRequestDTO company);
    void deleteCompany(Long id);
    //CompanygetResponseDTO getCompanyById(Long id);
    CompanygetResponseDTO getCompanyByName(String username);
}

