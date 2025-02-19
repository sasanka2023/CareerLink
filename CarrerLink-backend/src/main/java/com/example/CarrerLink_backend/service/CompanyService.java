package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.CompanyUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;

import java.util.List;

public interface CompanyService {
    List<CompanygetResponseDTO> getCompanies(String location, String category);
    List<CompanygetResponseDTO> getAllCompanies();

    List<CompanygetResponseDTO> searchCompanyByName(String name);
    String saveCompany(CompanySaveRequestDTO companySaveRequestDTO, UserEntity user);
    String updateCompany(CompanyUpdateRequestDTO company);
    void deleteCompany(Long id);
    //CompanygetResponseDTO getCompanyById(Long id);
    CompanygetResponseDTO getCompanyByName(String username);

    CompanygetResponseDTO getCompanyByUserId(int userId);
}

