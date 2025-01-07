package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.response.JobgetResponseDTO;
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
import org.modelmapper.TypeToken;

import java.util.List;

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




    @Test
    void getJobsShouldReturnListOfJobs() {

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

            JobgetResponseDTO jobDto = new JobgetResponseDTO();
            jobDto.setJobTitle("Software Engineer");  // Set the title to match what we're testing

            //Mocking is a technique used in testing where you create "fake" versions of
            // objects or dependencies that your code interacts with, instead of using real implementations.

            // Mocking the behavior of modelMapper. When map() method
            // is called with any JobgetResponseDTO, it returns the job object.
            Mockito.when(modelMapper.map(Mockito.anyList(), Mockito.eq(new TypeToken<List<JobgetResponseDTO>>() {}.getType())))
                .thenReturn(java.util.Collections.singletonList(jobDto));

            // Mocking the behavior of jobRepo. When save() method is called with any Job object,
            Mockito.when(jobRepo.findByJobTypeAndCompanyNameEquals(Mockito.anyString(), Mockito.anyString()))
                .thenReturn(java.util.List.of(job));

            // Calling the saveJob method, passing the Job DTO, and getting the result.
            String jobType = "Full Time";
            String company = "Google";
            List<JobgetResponseDTO> result = jobService.getJobs(jobType, company);

            Assertions.assertEquals(1, result.size());  // Since we're only returning one Job

            // Asserting that the result matches the expected string.
            Assertions.assertEquals("Software Engineer", result.get(0).getJobTitle());

            // Printing a success message if the test passes.
            System.out.println("Second test passed");




    }

    @Test
    void getAllJobsShouldReturnListOfJobs(){

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

            JobgetResponseDTO jobDto = new JobgetResponseDTO();
            jobDto.setJobTitle("Software Engineer");  // Set the title to match what we're testing

            //Mocking is a technique used in testing where you create "fake" versions of
            // objects or dependencies that your code interacts with, instead of using real implementations.

            // Mocking the behavior of modelMapper. When map() method
            // is called with any JobgetResponseDTO, it returns the job object.
            Mockito.when(modelMapper.map(Mockito.anyList(), Mockito.eq(new TypeToken<List<JobgetResponseDTO>>() {}.getType()))
            ).thenReturn(java.util.Collections.singletonList(jobDto));

            // Mocking the behavior of jobRepo. When save() method is called with any Job object,
            Mockito.when(jobRepo.findAll()).thenReturn(java.util.List.of(job));

            // Calling the saveJob method, passing the Job DTO, and getting the result.
            List<JobgetResponseDTO> result = jobService.getJobs();

            Assertions.assertEquals(1, result.size());  // Since we're only returning one Job

            // Asserting that the result matches the expected string.
            Assertions.assertEquals("Software Engineer", result.get(0).getJobTitle());

            // Printing a success message if the test passes.
            System.out.println("Third test passed");
    }


    @Test
    void updateJobShouldUpdateJobSuccessfully() {

        // Creating a new Job object to represent an existing job in the database.
        Job existingJob = new Job();
        existingJob.setJobId(1);
        existingJob.setJobTitle("Software Engineer");
        existingJob.setJobType("Full Time");
        existingJob.setCompanyName("Google");
        existingJob.setDescription("Software Engineer");
        existingJob.setLocation("Mountain View");
        existingJob.setRate(100000);
        existingJob.setRequirements("Java, Spring, Hibernate");


        // Creating a Job DTO that simulates the input to update.
        JobgetResponseDTO updatedJobDto = new JobgetResponseDTO();
        updatedJobDto.setJobId(1);
        updatedJobDto.setJobTitle("Senior Software Engineer");
        updatedJobDto.setJobType("Full Time");
        updatedJobDto.setCompanyName("Google");
        updatedJobDto.setDescription("Senior Software Engineer");
        updatedJobDto.setLocation("Mountain View");
        updatedJobDto.setRate(120000);
        updatedJobDto.setRequirements("Java, Spring, Hibernate,AWS");

        // Mocking the behavior of jobRepo. When existsById() is called, return true to indicate that the job exists.
        Mockito.when(jobRepo.existsById(Mockito.eq(1))).thenReturn(true);

        // Mocking the behavior of modelMapper to map the updatedJobDto into an existing Job object.
        Mockito.when(modelMapper.map(Mockito.any(JobgetResponseDTO.class), Mockito.eq(Job.class))).thenReturn(existingJob);

        // Ensure the job's title gets updated in the 'existingJob' object during the mapping.
        existingJob.setJobTitle(updatedJobDto.getJobTitle());


        // Mocking the behavior of jobRepo.save(). The save method will update the job and return the updated job.
        Mockito.when(jobRepo.save(Mockito.any(Job.class))).thenReturn(existingJob);

        // Calling the updateJob method with the updatedJobDto to test updating a job.
        String result = jobService.updateJob(updatedJobDto);

        // Asserting that the result indicates the job title has been updated.
        Assertions.assertEquals("Senior Software Engineerupdated", result);

        System.out.println("Fourth test passed");

    }

    @Test
    void deleteJobShouldDeleteJobSuccessfully() {

        // Creating a new Job object to represent an existing job in the database.
        Job existingJob = new Job();
        existingJob.setJobId(1);
        existingJob.setJobTitle("Software Engineer");
        existingJob.setJobType("Full Time");
        existingJob.setCompanyName("Google");
        existingJob.setDescription("Software Engineer");
        existingJob.setLocation("Mountain View");
        existingJob.setRate(100000);
        existingJob.setRequirements("Java, Spring, Hibernate");

        // Mocking the behavior of jobRepo. When existsById() is called, return true to indicate that the job exists.
        Mockito.when(jobRepo.existsById(Mockito.eq(1))).thenReturn(true);

        // Mocking the behavior of jobRepo.deleteById(). The deleteById method will
        String result = jobService.deleteJob(1);

        // Verifying that the deleteById method was called exactly once with the correct ID.
        Mockito.verify(jobRepo, Mockito.times(1)).deleteById(Mockito.eq(1));

        // Asserting that the result indicates the job was successfully deleted.
        Assertions.assertEquals("Job deleted", result);

        System.out.println("fifth test passed");
    }

}

