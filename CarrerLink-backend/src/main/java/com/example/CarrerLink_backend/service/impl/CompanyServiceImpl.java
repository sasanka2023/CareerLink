package com.example.CarrerLink_backend.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.CompanyUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.ApplicantDetailsgetResponseDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;
import com.example.CarrerLink_backend.dto.response.JobApproveResponseDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.exception.DuplicateResourceException;
import com.example.CarrerLink_backend.exception.InvalidInputException;
import com.example.CarrerLink_backend.exception.OperationFailedException;
import com.example.CarrerLink_backend.exception.ResourceNotFoundException;
import com.example.CarrerLink_backend.repo.*;
import com.example.CarrerLink_backend.service.CompanyService;
import com.example.CarrerLink_backend.utill.CommonFileSaveBinaryDataDto;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;
    private final CompanyRepository companyRepository;
    private final ModelMapper modelMapper;
    private final TechnologyRepo technologyRepo;
    private final CompanyImageRepository companyImageRepository;
    private final ClientRepo clientRepo;
    private static final String ACTION_1 = " not found. ";
    private final StudentJobsRepo studentJobsRepo;
    private final JobRepo jobRepo;
    private final StudentRepo studentRepo;
    private final AmazonS3 amazonS3;
    private final  FileServiceImpl fileService;


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
    public String updateCompany(CompanyUpdateRequestDTO dto, MultipartFile companyImage, MultipartFile coverImage) throws IOException {
        if (dto.getId() == null) {
            throw new InvalidInputException("Company ID is required for an update.");
        }

        Company company = companyRepository.findById(dto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found for ID: " + dto.getId()));

        company.setName(dto.getName());
        company.setLocation(dto.getLocation());
        company.setCategory(dto.getCategory());
        company.setSlogan(dto.getSlogan());
        company.setDescription(dto.getDescription());
        company.setSize(dto.getSize());
        company.setMobile(dto.getMobile());
        company.setWebsite(dto.getWebsite());
        company.setRequirements(dto.getRequirements());



        if (companyImage != null && !companyImage.isEmpty()) {
            company.setCompanyPicUrl(saveCompanyImageFile(company.getId(), companyImage, "company_image"));

        }

        if (coverImage != null && !coverImage.isEmpty()) {
            company.setCoverPicUrl(saveCompanyImageFile(company.getId(), coverImage, "cover_image"));
        }
        companyRepository.save(company);

        return "Updated successfully";
    }


    public String saveCompanyImageFile(long companyId, MultipartFile file, String imageType) {
        if (file == null || file.isEmpty()) {
            System.out.println("No file provided for company " + companyId + " (" + imageType + ")");
            return null;
        }

        try {
            Company company = companyRepository.findById(companyId)
                    .orElseThrow(() -> new RuntimeException("Company not found for ID: " + companyId));

            CompanyImage existingImage = companyImageRepository.findByCompanyIdAndType(companyId, imageType)
                    .orElse(null);

            // Delete old
            if (existingImage != null && existingImage.getUrl() != null) {
                String oldKey = existingImage.getUrl()
                        .substring(existingImage.getUrl().lastIndexOf("/") + 1);
                amazonS3.deleteObject(bucketName, imageType + "/" + oldKey);
            }

            // Upload new
            CommonFileSaveBinaryDataDto resource = fileService.createResource(file, imageType + "/", bucketName);

            if (existingImage == null) {
                existingImage = new CompanyImage();
                existingImage.setId(UUID.randomUUID().toString());
            }

            existingImage.setUrl(resource.getUrl());
            existingImage.setFileName(file.getOriginalFilename());
            existingImage.setType(imageType);
            existingImage.setCompany(company);

            companyImageRepository.save(existingImage);

            return existingImage.getUrl();

        } catch (Exception e) {
            System.out.println("Failed to save " + imageType + " for company " + companyId + ": " + e.getMessage());
            e.printStackTrace();
            return null;
        }
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
//            Notification notification = Notification.builder()
//                    .message("Your job application for " + job.getJobTitle() + " has been approved!")
//                    .userId((long) studentId)
//                    .isRead(false)
//                    .createdAt(LocalDateTime.now())
//                    .student(student)
//                    .build();
//            notificationService.sendNotification(String.valueOf(studentId), notification);
            return "approved successfully ";
        }
        else{
            throw new ResourceNotFoundException("Job not found");
        }



    }

    public List<ApplicantDetailsgetResponseDTO> getApprovedApplicants(int companyId){

        List<Job> jobs = jobRepo.findByCompany_Id(Long.valueOf(companyId));
//        List<StudentJobs> studentJobs = studentJobsRepo.findByStatusTrueAndJob_JobId()
        List<StudentJobs> studentJobs = new ArrayList<>();
        for(Job job : jobs){
            List<StudentJobs> studentJobs1 = studentJobsRepo.findByStatusTrueAndJob_JobId(job.getJobId());
            studentJobs.addAll(studentJobs1);
        }
        List<ApplicantDetailsgetResponseDTO> applicantDetailsgetResponseDTOList = new ArrayList<>();
        for(StudentJobs studentJobs2:studentJobs){
            ApplicantDetailsgetResponseDTO applicantDetailsgetResponseDTO = new ApplicantDetailsgetResponseDTO();
            applicantDetailsgetResponseDTO.setFirstName(studentJobs2.getStudent().getFirstName());
            applicantDetailsgetResponseDTO.setLastName(studentJobs2.getStudent().getLastName());
            applicantDetailsgetResponseDTO.setUniversity(studentJobs2.getStudent().getUniversity());
            applicantDetailsgetResponseDTO.setStatus(studentJobs2.getStatus());
            applicantDetailsgetResponseDTO.setInterviewDate(studentJobs2.getInterviewDate());
            applicantDetailsgetResponseDTO.setJobFieldName(studentJobs2.getJob().getJobTitle());
            applicantDetailsgetResponseDTOList.add(applicantDetailsgetResponseDTO);
        }
        return applicantDetailsgetResponseDTOList;
        
    }

}
