package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.CompanyUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.ApplicantDetailsgetResponseDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;
import com.example.CarrerLink_backend.dto.response.JobApproveResponseDTO;
import com.example.CarrerLink_backend.entity.Company;
import com.example.CarrerLink_backend.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CompanyService {
    List<CompanygetResponseDTO> getCompanies(String location, String category);
    List<CompanygetResponseDTO> getAllCompanies();

    List<CompanygetResponseDTO> searchCompanyByName(String name);
    String saveCompany(CompanySaveRequestDTO companySaveRequestDTO, UserEntity user);
    String updateCompany(CompanyUpdateRequestDTO companyUpdateRequestDTO, MultipartFile companyImage, MultipartFile coverImage) throws IOException;
    void deleteCompany(Long id);
    //CompanygetResponseDTO getCompanyById(Long id);
    CompanygetResponseDTO getCompanyByName(String username);

    CompanygetResponseDTO getCompanyByUserId(int userId);

    String approveJob(int studentId, int jobId,JobApproveResponseDTO jobApproveResponseDTO);

    List<ApplicantDetailsgetResponseDTO> getApprovedApplicants(int companyId);

    Company findByUser(UserEntity user);
}

