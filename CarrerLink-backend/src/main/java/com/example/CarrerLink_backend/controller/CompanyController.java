package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.CompanyUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.ApplicantDetailsgetResponseDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;


import com.example.CarrerLink_backend.dto.response.JobApproveResponseDTO;
import com.example.CarrerLink_backend.dto.response.JobgetResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.service.CompanyService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/companies")
@AllArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @Operation(
            summary = "Get companies with filters",
            description = "Fetch companies with filters location and category."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all companies"),
            @ApiResponse(responseCode = "400", description = "Invalid path parameters"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping({"/filter"})
    public ResponseEntity<StandardResponse> getCompanies(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String category
    ) {
        List<CompanygetResponseDTO> companies = companyService.getCompanies(location, category);
        return ResponseEntity.ok(new StandardResponse(true, "Companies fetched successfully", companies));
    }

    @Operation(
            summary = "Get all companies",
            description = "Fetch all companies without any filters."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all companies"),
            @ApiResponse(responseCode = "400", description = "Invalid path parameters"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping()
    public ResponseEntity<StandardResponse> getAllCompanies() {
        List<CompanygetResponseDTO> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(new StandardResponse(true, "Companies fetched successfully", companies));
    }

    // Search a company by name
    @Operation(summary = "Search a company by name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched company"),
            @ApiResponse(responseCode = "404", description = "Company not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/search")
    public ResponseEntity<StandardResponse> searchCompanyByName(@RequestParam String name) {
        List<CompanygetResponseDTO> companies = companyService.searchCompanyByName(name);
        return ResponseEntity.ok(new StandardResponse(true, "Company fetched successfully", companies));
    }

    // Save a new company
    @Operation(summary = "Save a company")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Company created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    public ResponseEntity<StandardResponse> saveCompany(@RequestBody CompanySaveRequestDTO companySaveRequestDTO, UserEntity user) {
        String savedCompany = companyService.saveCompany(companySaveRequestDTO,user);
        return ResponseEntity.status(201)
                .body(new StandardResponse(true, "Company saved successfully", savedCompany));
    }

    // Update an existing company
    @Operation(summary = "Update a company")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Company updated successfully"),
            @ApiResponse(responseCode = "404", description = "Company not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping()
    public ResponseEntity<StandardResponse> updateCompany(@RequestBody CompanyUpdateRequestDTO companyUpdateRequestDTO) {
        String updatedCompany = companyService.updateCompany(companyUpdateRequestDTO);
        return ResponseEntity.ok(new StandardResponse(true, "Company updated successfully", updatedCompany));
    }

    // Delete a company
    @Operation(summary = "Delete a company")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Company deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Company not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponse> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.ok(new StandardResponse(true, "Company deleted successfully", null));
    }


    @Operation(summary = "Get company by username")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all applicants"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/username/{username}")
    public ResponseEntity<StandardResponse> getCompanyByName(@PathVariable String username){
        CompanygetResponseDTO company = companyService.getCompanyByName(username);
        return ResponseEntity.ok(new StandardResponse(true, "Applicants fetched successfully", company));
    }

    @Operation(summary = "Get company by userid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all applicants"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/userId/{userId}")
    public ResponseEntity<StandardResponse> getCompanyById(@PathVariable int userId){
        CompanygetResponseDTO company = companyService.getCompanyByUserId(userId);
        return ResponseEntity.ok(new StandardResponse(true, "Applicants fetched successfully", company));
    }



    @Operation(summary = "Aprove a job for student")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all applicants"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping("/approve-job")
    public ResponseEntity<StandardResponse> approveJob(
            @RequestParam int studentId,
            @RequestParam int jobId,
            @RequestBody JobApproveResponseDTO jobApproveResponseDTO){
        String message = companyService.approveJob(studentId,jobId,jobApproveResponseDTO);
        return ResponseEntity.ok(new StandardResponse(true,"Job approved successfully",message));
    }

    @Operation(summary = "get all the approved applicants")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all applicants"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/all-the-approved-applicants/{companyId}")
    public ResponseEntity<StandardResponse> getAllTheApprovedApplicants(@PathVariable int companyId){
        List<ApplicantDetailsgetResponseDTO> applicantDetailsgetResponseDTOList = companyService.getApprovedApplicants(companyId);
        return ResponseEntity.ok(new StandardResponse(true,"Job approved successfully",applicantDetailsgetResponseDTOList));

    }




}

