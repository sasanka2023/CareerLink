package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.CompanyDTO;
import com.example.CarrerLink_backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/companies")
@Validated
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public ResponseEntity<Page<CompanyDTO>> getCompanies(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<CompanyDTO> companies = companyService.getCompanies(location, category, page, size);
        return ResponseEntity.ok(companies);
    }

    // Method without filters to fetch all companies
    @GetMapping("/all")
    public ResponseEntity<Page<CompanyDTO>> getAllCompanies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<CompanyDTO> companies = companyService.getAllCompanies(page, size);
        return ResponseEntity.ok(companies);
    }

}
