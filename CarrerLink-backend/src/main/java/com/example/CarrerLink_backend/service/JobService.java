package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.response.ApplicantDetailsgetResponseDTO;
import com.example.CarrerLink_backend.dto.response.JobgetResponseDTO;
import com.example.CarrerLink_backend.dto.response.StudentgetResponseDTO;
import com.example.CarrerLink_backend.entity.Company;

import java.util.List;

public interface JobService {
    List<ApplicantDetailsgetResponseDTO> getAllApplicants(int jobId);

    String saveJob(JobgetResponseDTO jobgetResponseDTO, Long companyId);
    List<JobgetResponseDTO> getJobs(String jobType, String company);
    List<JobgetResponseDTO> getJobs();

    String updateJob(JobgetResponseDTO jobgetResponseDTO);

    String deleteJob(int jobId);


    List<JobgetResponseDTO> getAllJobByCompany(int companyId);
}
