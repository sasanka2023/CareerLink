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
import java.util.Optional;

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

    @Override
    public List<CompanyDTO> searchCompanyByName(String name) {
        List<Company> companies = companyRepository.findByNameContainingIgnoreCase(name);
        return modelMapper.map(companies, new TypeToken<List<CompanyDTO>>() {}.getType());
    }

    @Override
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Company updateCompany(Long id, Company companyDetails) {
        Optional<Company> existingCompany = companyRepository.findById(id);

        if (existingCompany.isEmpty()) {
            throw new RuntimeException("Company with ID " + id + " not found.");
        }

        Company company = existingCompany.get();
        company.setName(companyDetails.getName());
        company.setLogo(companyDetails.getLogo());
        company.setDescription(companyDetails.getDescription());
        company.setCategory(companyDetails.getCategory());
        company.setMobile(companyDetails.getMobile());
        company.setLocation(companyDetails.getLocation());
        company.setCoverImage(companyDetails.getCoverImage());
        company.setEmail(companyDetails.getEmail());
        company.setRequirements(companyDetails.getRequirements());
        company.setWebsite(companyDetails.getWebsite());

        return companyRepository.save(company);
    }

    @Override
    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company with ID " + id + " not found.");
        }
        companyRepository.deleteById(id);
    }





}
