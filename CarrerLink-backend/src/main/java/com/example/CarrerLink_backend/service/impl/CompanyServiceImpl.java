package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.CompanyUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;
import com.example.CarrerLink_backend.dto.response.JobApproveResponseDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.exception.DuplicateResourceException;
import com.example.CarrerLink_backend.exception.InvalidInputException;
import com.example.CarrerLink_backend.exception.OperationFailedException;
import com.example.CarrerLink_backend.exception.ResourceNotFoundException;
import com.example.CarrerLink_backend.repo.*;
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
    private final StudentJobsRepo studentJobsRepo;
    private final JobRepo jobRepo;
    private final StudentRepo studentRepo;
    private final NotificationService notificationService;

    @Override
    public List<CompanygetResponseDTO> getCompanies(String location, String category) {
        List<Company> companies;

        if (location != null && category != null) {
            companies = companyRepository.findByLocationAndCategory(location, category);
        } else if (location != null) {
            companies = companyRepository.findByLocation(location);
        } else if (category != null) {
            companies = companyRepository.findByCategory(category);
        } else {
            companies = companyRepository.findAll();
        }
        if (companies.isEmpty()) {
            throw new RuntimeException("No companies found for the given filters.");
        }
        return modelMapper.map(companies, new TypeToken<List<CompanygetResponseDTO>>() {}.getType());
    }

    @Override
    public List<CompanygetResponseDTO> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        if (companies.isEmpty()) {
            throw new ResourceNotFoundException("No companies found.");
        }
        return modelMapper.map(companies, new TypeToken<List<CompanygetResponseDTO>>() {}.getType());
    }

    @Override
    public List<CompanygetResponseDTO> searchCompanyByName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new InvalidInputException("Company name cannot be null or empty.");
        }
        List<Company> companies = companyRepository.findByNameContainingIgnoreCase(name);
        if (companies.isEmpty()) {
            throw new ResourceNotFoundException("No companies found with the name: " + name);
        }
        return modelMapper.map(companies, new TypeToken<List<CompanygetResponseDTO>>() {}.getType());
    }

    @Override
    public String saveCompany(CompanySaveRequestDTO companySaveRequestDTO,UserEntity user) {
        if (companySaveRequestDTO.getName() == null || companySaveRequestDTO.getLocation() == null) {
            throw new InvalidInputException("Company name and location are required.");
        }
        if (companyRepository.findByName(companySaveRequestDTO.getName()).isPresent()) {
            throw new DuplicateResourceException("Company with the name " + companySaveRequestDTO.getName() + " already exists.");
        }
        Company company = modelMapper.map(companySaveRequestDTO, Company.class);
        company.setUser(user);
        companyRepository.save(company);
        return "Company saved successfully";
    }

    @Override
    @Transactional
    public String updateCompany(CompanyUpdateRequestDTO companyUpdateRequestDTO) {
        if (companyUpdateRequestDTO.getId() == null) {
            throw new InvalidInputException("Company ID is required for an update.");
        }
        if (!companyRepository.existsById(companyUpdateRequestDTO.getId())) {
            throw new ResourceNotFoundException("Company with ID " + companyUpdateRequestDTO.getId() + ACTION_1);
        }
        Company company = modelMapper.map(companyUpdateRequestDTO, Company.class);
        updateProducts(companyUpdateRequestDTO, company);
        updateClients(companyUpdateRequestDTO, company);
        updateTechnologies(companyUpdateRequestDTO, company);
        companyRepository.save(company);
        return "Updated successfully";
    }

    public void updateProducts(CompanyUpdateRequestDTO companyUpdateRequestDTO,Company company){
        if (companyUpdateRequestDTO.getProducts() != null) {
            for (Products product : company.getProducts()) {
                product.setCompany(company);
            }
        }
    }

    private void updateClients(CompanyUpdateRequestDTO companyUpdateRequestDTO, Company company) {
        if (companyUpdateRequestDTO.getClients() != null) {
            List<Client> clients = new ArrayList<>();
            for (ClientDTO mappedClient : companyUpdateRequestDTO.getClients()) {
                Client client = clientRepo.findByClientName(mappedClient.getClientName())
                        .orElseThrow(() -> new ResourceNotFoundException("Client with name " + mappedClient.getClientName() + ACTION_1));
                clients.add(client);
            }
            company.setClients(clients);
        }
    }

    private void updateTechnologies(CompanyUpdateRequestDTO companyUpdateRequestDTO, Company company) {
        if (companyUpdateRequestDTO.getTechnologies() != null) {
            List<Technology> technologies = new ArrayList<>();
            for (TechnologyDTO mappedTechnology : companyUpdateRequestDTO.getTechnologies()) {
                Technology technology = technologyRepo.findByTechName(mappedTechnology.getTechName())
                        .orElseThrow(() -> new ResourceNotFoundException("Technology with name " + mappedTechnology.getTechName() + ACTION_1));
                technologies.add(technology);
            }
            company.setTechnologies(technologies);
        }
    }


    @Override
    public void deleteCompany(Long id) {
        if (id == null) {
            throw new InvalidInputException("Company ID cannot be null.");
        }
        if (!companyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Company with ID " + id + " not found.");
        }
        try {
            companyRepository.deleteById(id);
        } catch (Exception e) {
            throw new OperationFailedException("Failed to delete company with ID " + id + ": " + e.getMessage());
        }
    }


    @Override
    public CompanygetResponseDTO getCompanyByName(String username) {
        Company company = companyRepository.findByName(username).orElseThrow(()->new RuntimeException("Company not found"));
        return modelMapper.map(company, CompanygetResponseDTO.class);
    }


    @Override
    public CompanygetResponseDTO getCompanyByUserId(int userId) {
        Company company = companyRepository.findByUser_Id(userId).orElseThrow(()->new RuntimeException("Company not found"));
        return modelMapper.map(company, CompanygetResponseDTO.class);
    }

    @Override
    public String approveJob(int studentId,int jobId,JobApproveResponseDTO jobApproveResponseDTO) {
        if(jobRepo.existsById(jobId)){

            Job job = jobRepo.findByJobId(jobId).orElseThrow(()->new RuntimeException("Job not found"));
            Student student = studentRepo.findById(studentId).orElseThrow(()->new RuntimeException("Student not found"));
            StudentJobs studentJobs = studentJobsRepo.findByStudentAndJob(student,job);
            studentJobs.setInterviewDate(jobApproveResponseDTO.getInterviewDate());
            studentJobs.setStatus(jobApproveResponseDTO.getStatus());
            studentJobsRepo.save(studentJobs);
        }
        else{
            throw new ResourceNotFoundException("Job not found");
        }


//        notificationService.sendNotification(String.valueOf(studentId),
//                Notification.builder()
//                        .message("Your job application has been approved")
//                        .userId(Long.valueOf(studentId))
//                        .isRead(false)
//                        .createdAt(java.time.LocalDateTime.now())
//                        .build());
        return "approved successfully ";
    }
}
