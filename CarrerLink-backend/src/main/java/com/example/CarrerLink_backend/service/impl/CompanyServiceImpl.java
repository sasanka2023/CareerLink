package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.CompanyDTO;
import com.example.CarrerLink_backend.entity.Company;
import com.example.CarrerLink_backend.repo.CompanyRepository;
import com.example.CarrerLink_backend.service.CompanyService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<CompanyDTO> getCompanies(String location, String category) {
        List<Company> companies = companyRepository.findByLocationAndCategory(location, category);
        return modelMapper.map(companies, new TypeToken<List<CompanyDTO>>() {}.getType());
    }

    @Override
    public List<CompanyDTO> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return modelMapper.map(companies, new TypeToken<List<CompanyDTO>>() {}.getType());
    }
}
