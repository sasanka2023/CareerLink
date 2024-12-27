package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.JobgetResponseDTO;

import java.util.List;

public interface JobService {
    String saveJob(JobgetResponseDTO jobgetResponseDTO);
    List<JobgetResponseDTO> getJobs(String jobType, String company);
    List<JobgetResponseDTO> getJobs();

    String updateJob(JobgetResponseDTO jobgetResponseDTO);

    String deleteJob(int jobId);
}
