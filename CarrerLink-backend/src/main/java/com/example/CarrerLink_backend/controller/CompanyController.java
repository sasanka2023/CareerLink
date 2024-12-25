package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.CompanyDTO;
import com.example.CarrerLink_backend.entity.Company;
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
            summary = "Get all companies",
            description = "Fetch all companies with filters location and category."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all companies"),
            @ApiResponse(responseCode = "400", description = "Invalid path parameters"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{location}/{category}")
    public ResponseEntity<StandardResponse> getCompanies(
            @PathVariable(required = false) String location,
            @PathVariable(required = false) String category
    ) {
        List<CompanyDTO> companies = companyService.getCompanies(location, category);
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
        List<CompanyDTO> companies = companyService.getAllCompanies();
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
        List<CompanyDTO> companies = companyService.searchCompanyByName(name);
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
    public ResponseEntity<StandardResponse> saveCompany(@RequestBody Company company) {
        Company savedCompany = companyService.saveCompany(company);
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
    @PutMapping("/{id}")
    public ResponseEntity<StandardResponse> updateCompany(@PathVariable Long id, @RequestBody Company company) {
        Company updatedCompany = companyService.updateCompany(id, company);
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
}

