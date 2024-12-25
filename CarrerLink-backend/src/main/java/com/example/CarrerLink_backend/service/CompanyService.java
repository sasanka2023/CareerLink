package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.CompanyDTO;
import com.example.CarrerLink_backend.entity.Company;

import java.util.List;

public interface CompanyService {
    List<CompanyDTO> getCompanies(String location, String category);
    List<CompanyDTO> getAllCompanies();

    List<CompanyDTO> searchCompanyByName(String name);
    Company saveCompany(Company company);
    Company updateCompany(Long id, Company company);
    void deleteCompany(Long id);
}

