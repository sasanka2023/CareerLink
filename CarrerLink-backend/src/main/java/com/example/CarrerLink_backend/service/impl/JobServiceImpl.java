package com.example.CarrerLink_backend.service.impl;



import com.example.CarrerLink_backend.dto.TechnologyDTO;
import com.example.CarrerLink_backend.dto.response.JobgetResponseDTO;
import com.example.CarrerLink_backend.entity.Company;
import com.example.CarrerLink_backend.entity.Job;
import com.example.CarrerLink_backend.entity.Technology;
import com.example.CarrerLink_backend.exception.ResourceNotFoundException;
import com.example.CarrerLink_backend.repo.CompanyRepository;
import com.example.CarrerLink_backend.repo.JobRepo;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
import com.example.CarrerLink_backend.service.JobService;
import lombok.AllArgsConstructor;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepo jobRepo;
    private final ModelMapper modelMapper;
    private final TechnologyRepo technologyRepo;
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public  String saveJob(JobgetResponseDTO jobgetResponseDTO, Long companyId) {
        Job job =modelMapper.map(jobgetResponseDTO,Job.class);
        Optional<Company> company = companyRepository.findById(companyId);
        if (company.isPresent()) {
            job.setCompany(company.get()); // Setting the company to the Job entity
        } else {
            return "Company not found";
        }
        List<Technology> techs = new ArrayList<>();
        for(TechnologyDTO techdtos: jobgetResponseDTO.getTechnologies()){
            Technology technology = technologyRepo.findByTechName(techdtos.getTechName())
                    .orElseThrow(() -> new ResourceNotFoundException("Technology with name " + techdtos.getTechName() + "Not found"));
            techs.add(technology);
        }
        job.setTechnologies(techs);


        jobRepo.save(job);
        return job.getJobTitle()+"saved";

    }


    @Override
    public List<JobgetResponseDTO> getJobs(String jobType, String company) {
        System.out.println("Job Type: " + jobType + ", Company: " + company);
        List<Job> jobs;

        if ((jobType == null || jobType.isEmpty()) && (company == null || company.isEmpty())) {
            jobs = jobRepo.findAll();
        } else if (jobType == null || jobType.isEmpty()) {
            jobs = jobRepo.findByCompanyName(company);
        } else if (company == null || company.isEmpty()) {
            jobs = jobRepo.findByJobType(jobType);
        } else {
            jobs = jobRepo.findByJobTypeAndCompanyNameEquals(jobType, company);
        }

        return jobs.stream()
                .map(job -> modelMapper.map(job, JobgetResponseDTO.class))
                .collect(Collectors.toList());
    }


    @Override
    public List<JobgetResponseDTO> getJobs() {
        List<Job> jobs = jobRepo.findAll();
        return modelMapper.map(jobs,new TypeToken<List<JobgetResponseDTO>>() {}.getType());
    }

    @Override
    public String updateJob(JobgetResponseDTO jobgetResponseDTO) {
        if(jobRepo.existsById(jobgetResponseDTO.getJobId())){
            Job job = modelMapper.map(jobgetResponseDTO,Job.class);
            jobRepo.save(job);
            return job.getJobTitle()+"updated";
        }else{
            throw new RuntimeException("Job not found");
        }

    }

    @Override
    public String deleteJob(int jobId) {
        if(jobRepo.existsById(jobId)){
            jobRepo.deleteById(jobId);
            return "Job deleted";
        }else{
            throw new RuntimeException("Job not found");
        }
    }

    @Override
    public Company getCompanyByJobId(int jobId) {
        return jobRepo.findByJobId(jobId).orElseThrow(() -> new ResourceNotFoundException("no company found"));

    }
}
