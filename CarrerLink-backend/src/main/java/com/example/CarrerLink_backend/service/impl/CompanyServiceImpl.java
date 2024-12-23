package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.CompanyDTO;
import com.example.CarrerLink_backend.entity.Company;
import com.example.CarrerLink_backend.repo.CompanyRepository;
import com.example.CarrerLink_backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public Page<CompanyDTO> getCompanies(String location, String category, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);

        // Fetch companies with filters and pagination
        Page<Company> companies = companyRepository.findByLocationAndCategory(location, category, pageRequest);

         //Convert Company entities to CompanyDTOs
        return companies.map(c -> new CompanyDTO(
                c.getName(),
                c.getDescription(),
                c.getCategory(),
                c.getLocation(),
                c.getEmail()
        ));
    }

    @Override
    public Page<CompanyDTO> getAllCompanies(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);

        // Fetch all companies from the database with pagination
        Page<Company> companies = companyRepository.findAll(pageRequest);

        // Convert Company entities to CompanyDTOs
        return companies.map(c -> new CompanyDTO(
                c.getName(),
                c.getDescription(),
                c.getCategory(),
                c.getLocation(),
                c.getEmail()
        ));
    }

}
