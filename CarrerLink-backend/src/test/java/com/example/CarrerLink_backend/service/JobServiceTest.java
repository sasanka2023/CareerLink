package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.JobgetResponseDTO;
import com.example.CarrerLink_backend.entity.Job;
import com.example.CarrerLink_backend.repo.JobRepo;
import com.example.CarrerLink_backend.service.impl.JobServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

// This annotation allows the test to use Mockito framework for mocking dependencies.
@ExtendWith(MockitoExtension.class)
public class JobServiceTest {

    // Mocking the JobRepo dependency, so we don't rely on an actual database.
    @Mock
    JobRepo jobRepo;

    // Mocking ModelMapper, which is used to convert DTO to Entity.
    @Mock
    ModelMapper modelMapper;

    // InjectMocks tells Mockito to inject the mocked dependencies (jobRepo and modelMapper) into jobService.
    @InjectMocks
    JobServiceImpl jobService;

    // This is the actual test method. We are testing the saveJob method of JobService.
    @Test
    void saveJobShouldAddJobSuccessfully() {

        // Creating a new Job object with data to be saved.
        Job job = new Job();
        job.setJobId(1);
        job.setJobTitle("Software Engineer");
        job.setJobType("Full Time");
        job.setCompanyName("Google");
        job.setDescription("Software Engineer");
        job.setLocation("Mountain View");
        job.setRate(100000);
        job.setRequirements("Java, Spring, Hibernate");

        //Mocking is a technique used in testing where you create "fake" versions of
        // objects or dependencies that your code interacts with, instead of using real implementations.

        // Mocking the behavior of modelMapper. When map() method
        // is called with any JobgetResponseDTO, it returns the job object.
        Mockito.when(modelMapper.map(Mockito.any(JobgetResponseDTO.class), Mockito.eq(Job.class))).thenReturn(job);

        // Mocking the behavior of jobRepo. When save() method is called with any Job object,
        Mockito.when(jobRepo.save(Mockito.any(Job.class))).thenReturn(job);

        // Creating a JobgetResponseDTO to simulate input to saveJob() method
        JobgetResponseDTO jobDTO = new JobgetResponseDTO();

        jobDTO.setJobId(1);
        jobDTO.setJobTitle("Software Engineer");
        jobDTO.setJobType("Full Time");
        jobDTO.setCompanyName("Google");
        jobDTO.setDescription("Software Engineer");
        jobDTO.setLocation("Mountain View");
        jobDTO.setRate(100000);
        jobDTO.setRequirements("Java, Spring, Hibernate");


        // Calling the saveJob method, passing the Job DTO, and getting the result.
        String result =jobService.saveJob(jobDTO);

        // Asserting that the result matches the expected string.
        Assertions.assertEquals("Software Engineersaved",result);

        // Printing a success message if the test passes.
        System.out.println("First test passed");


    }
}
