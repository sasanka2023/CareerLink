package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.CompanyDTO;
import com.example.CarrerLink_backend.service.CompanyService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

