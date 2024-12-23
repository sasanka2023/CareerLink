package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.CompanyDTO;
import com.example.CarrerLink_backend.repo.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface CompanyService {
    Page<CompanyDTO> getCompanies(String location, String category, int page, int size);
    Page<CompanyDTO> getAllCompanies(int page, int size);
}
