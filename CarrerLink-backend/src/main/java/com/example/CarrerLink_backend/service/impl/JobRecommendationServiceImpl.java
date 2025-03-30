package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.JobRecommendationDTO;
import com.example.CarrerLink_backend.dto.response.JobgetResponseDTO;
import com.example.CarrerLink_backend.entity.Job;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.entity.Technology;
import com.example.CarrerLink_backend.repo.JobRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class JobRecommendationServiceImpl {


    private final JobRepo jobRepository;
    private final ModelMapper modelMapper;
    public List<JobRecommendationDTO> getRecommendedJobsWithScores(Student student) {
        // Extract student's technology names in lowercase
        Set<String> studentTechNames = student.getTechnologies().stream()
                .map(tech -> tech.getTechName().trim().toLowerCase()) // Trim whitespace
                .collect(Collectors.toSet());

        // Fetch jobs with at least one matching technology name
        List<Job> matchingJobs = jobRepository.findJobsWithMatchingTechnologies(
                new ArrayList<>(studentTechNames)
        );

        return matchingJobs.stream()
                .map(job -> {
                    List<Technology> jobTechs = job.getTechnologies();
                    // Normalize job technology names
                    List<String> normalizedJobTechNames = jobTechs.stream()
                            .map(tech -> tech.getTechName().trim().toLowerCase())
                            .collect(Collectors.toList());

                    // Count matches
                    long matchCount = normalizedJobTechNames.stream()
                            .filter(studentTechNames::contains)
                            .count();

                    // Calculate score (handle division by zero)
                    double score = jobTechs.isEmpty() ? 0 : (double) matchCount / jobTechs.size();

                    JobgetResponseDTO jobResponse = modelMapper.map(job, JobgetResponseDTO.class);
                    return new JobRecommendationDTO(jobResponse, score);
                })
                .sorted(Comparator.comparingDouble(JobRecommendationDTO::getScore).reversed())
                .collect(Collectors.toList());
    }




}
