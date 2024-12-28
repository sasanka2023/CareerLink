package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.entity.Client;
import com.example.CarrerLink_backend.entity.Company;
import com.example.CarrerLink_backend.entity.Products;
import com.example.CarrerLink_backend.entity.Technology;
import com.example.CarrerLink_backend.repo.ClientRepo;
import com.example.CarrerLink_backend.repo.CompanyRepository;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
import com.example.CarrerLink_backend.service.CompanyService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final ModelMapper modelMapper;
    private final TechnologyRepo technologyRepo;
    private final ClientRepo clientRepo;
    private static final String ACTION_1 = " not found. ";

    @Override
    public List<CompanygetResponseDTO> getCompanies(String location, String category) {
        List<Company> companies = companyRepository.findByLocationAndCategory(location, category);
        return modelMapper.map(companies, new TypeToken<List<CompanygetResponseDTO>>() {}.getType());
    }

    @Override
    public List<CompanygetResponseDTO> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return modelMapper.map(companies, new TypeToken<List<CompanygetResponseDTO>>() {}.getType());
    }

    @Override
    public List<CompanygetResponseDTO> searchCompanyByName(String name) {
        List<Company> companies = companyRepository.findByNameContainingIgnoreCase(name);
        return modelMapper.map(companies, new TypeToken<List<CompanygetResponseDTO>>() {}.getType());
    }

    @Override
    public String saveCompany(CompanySaveRequestDTO companySaveRequestDTO) {
        Company company = modelMapper.map(companySaveRequestDTO, Company.class);
        companyRepository.save(company);
        return "Company saved successfully";
    }

    @Override
    @Transactional
    public String updateCompany(CompanyUpdateRequestDTO companyUpdateRequestDTO) {
        if (companyRepository.existsById(companyUpdateRequestDTO.getId())) {
            Company company = modelMapper.map(companyUpdateRequestDTO, Company.class);

            updateProducts(companyUpdateRequestDTO, company);
            updateClients(companyUpdateRequestDTO, company);
            updateTechnologies(companyUpdateRequestDTO, company);
            companyRepository.save(company);
            return "updated successfully";
        }
        else{
            throw new RuntimeException("Company with ID " + companyUpdateRequestDTO.getId() + ACTION_1);
        }
    }

    public void updateProducts(CompanyUpdateRequestDTO companyUpdateRequestDTO,Company company){
        if (companyUpdateRequestDTO.getProducts() != null) {
            for (Products product : company.getProducts()) {
                product.setCompany(company);
            }
        }
    }

    public void updateClients(CompanyUpdateRequestDTO companyUpdateRequestDTO,Company company){
        if (companyUpdateRequestDTO.getClients() != null) {

            List<Client> clients = new ArrayList<>();
            for (ClientDTO mappedClient : companyUpdateRequestDTO.getClients()) {
                Client client = clientRepo.findByClientName(mappedClient.getClientName())
                        .orElseThrow(() -> new RuntimeException("Client with name " + mappedClient.getClientName() + ACTION_1));
                clients.add(client);
            }
            company.setClients(clients);
        }
    }

    public void updateTechnologies(CompanyUpdateRequestDTO companyUpdateRequestDTO,Company company){
        if (companyUpdateRequestDTO.getTechnologies() != null) {
            List<Technology> technologies = new ArrayList<>();
            for (TechnologyDTO mappedTechnology : companyUpdateRequestDTO.getTechnologies()) {
                Technology technology = technologyRepo.findByTechName(mappedTechnology.getTechName())
                        .orElseThrow(() -> new RuntimeException("Technology with name " + mappedTechnology.getTechName() + ACTION_1));
                technologies.add(technology);
            }
            company.setTechnologies(technologies);
        }
    }


    @Override
    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company with ID " + id + ACTION_1);
        }
        companyRepository.deleteById(id);
    }





}
