package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.dto.response.JobgetResponseDTO;
import com.example.CarrerLink_backend.service.JobService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/jobs")
@AllArgsConstructor
public class JobController {

private final JobService jobService;

    @Operation(
            summary = "Get jobs with filters",
            description = "Fetch all jobs with optional filters job type,rate and company."
    )
    @ApiResponses(value ={
            @ApiResponse(responseCode = "200",description = "Successfully fetched all jobs"),
            @ApiResponse(responseCode = "400",description = "Invalid path parameters"),
            @ApiResponse(responseCode = "500",description = "Internal server error")
    })
    @GetMapping("/filter")
    public ResponseEntity<StandardResponse> getJobs(
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String company

    ){
        List<JobgetResponseDTO> jobs = jobService.getJobs(jobType,company);
        return ResponseEntity.ok(new StandardResponse(true,"Jobs fetched successfully",jobs));
    }


    @Operation(
            summary = "Get all jobs",
            description = "Fetch all jobs with optional filters job type,rate and company."
    )
    @ApiResponses(value ={
            @ApiResponse(responseCode = "200",description = "Successfully fetched all jobs"),
            @ApiResponse(responseCode = "400",description = "Invalid path parameters"),
            @ApiResponse(responseCode = "500",description = "Internal server error")
    })
    @GetMapping()
    public ResponseEntity<StandardResponse> getJobs(){
        List<JobgetResponseDTO> jobs = jobService.getJobs();
        return ResponseEntity.ok(new StandardResponse(true,"Jobs fetched successfully",jobs));
    }

    @Operation(
            summary = "save a job",
            description = "save job"
    )
    @ApiResponses(value ={
            @ApiResponse(responseCode = "200",description = "Successfully saved job"),
            @ApiResponse(responseCode = "400",description = "Invalid path parameters"),
            @ApiResponse(responseCode = "500",description = "Internal server error")
    })

    @PostMapping(path = "/save")

    public ResponseEntity<StandardResponse> saveJob(@RequestBody JobgetResponseDTO jobgetResponseDTO, @RequestParam Long companyId){
        String msg = jobService.saveJob(jobgetResponseDTO,companyId);
        return  ResponseEntity.ok(new StandardResponse(true, msg, null));
    }
    @Operation(
            summary = "update a job",
            description = "update job"
    )
    @ApiResponses(value ={
            @ApiResponse(responseCode = "200",description = "Successfully updated job"),
            @ApiResponse(responseCode = "400",description = "Invalid path parameters"),
            @ApiResponse(responseCode = "500",description = "Internal server error")
    })

    @PutMapping(path = "/update")
    public ResponseEntity<StandardResponse> updateJob(@RequestBody JobgetResponseDTO jobgetResponseDTO){
        String msg = jobService.updateJob(jobgetResponseDTO);
        return  ResponseEntity.ok(new StandardResponse(true, msg, null));
    }
    @Operation(
            summary = "delete a job",
            description = "delete job"
    )
    @ApiResponses(value ={
            @ApiResponse(responseCode = "200",description = "Successfully deleted job"),
            @ApiResponse(responseCode = "400",description = "Invalid path parameters"),
            @ApiResponse(responseCode = "500",description = "Internal server error")
    })

    @DeleteMapping(path = "/delete")
    public ResponseEntity<StandardResponse> deleteJob(@RequestParam int jobId){
        String msg = jobService.deleteJob(jobId);
        return  ResponseEntity.ok(new StandardResponse(true, msg, null));
    }




}
