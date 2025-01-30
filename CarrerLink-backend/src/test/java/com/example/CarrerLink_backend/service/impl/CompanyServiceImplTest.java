package com.example.CarrerLink_backend.service.impl;
import com.example.CarrerLink_backend.dto.request.CompanySaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.CompanyUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;
import com.example.CarrerLink_backend.entity.Company;
import com.example.CarrerLink_backend.repo.ClientRepo;
import com.example.CarrerLink_backend.repo.CompanyRepository;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
import com.example.CarrerLink_backend.service.impl.CompanyServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceImplTest {

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private TechnologyRepo technologyRepo;

    @Mock
    private ClientRepo clientRepo;

    @InjectMocks
    private CompanyServiceImpl companyService;


    @Test
    void getCompaniesShouldReturnCompaniesForLocationAndCategory() {
        Company company = new Company();
        company.setId(1L);
        company.setName("Tech Solutions");

        CompanygetResponseDTO companyDto = new CompanygetResponseDTO();
        companyDto.setName("Tech Solutions");

        Mockito.when(companyRepository.findByLocationAndCategory("New York", "IT"))
                .thenReturn(List.of(company));
        Mockito.when(modelMapper.map(Mockito.anyList(), Mockito.eq(new TypeToken<List<CompanygetResponseDTO>>() {}.getType())))
                .thenReturn(List.of(companyDto));

        List<CompanygetResponseDTO> result = companyService.getCompanies("New York", "IT");

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Tech Solutions", result.get(0).getName());
    }

    @Test
    void getCompaniesShouldReturnCompaniesForOnlyLocation() {
        Company company = new Company();
        company.setId(2L);
        company.setName("Local Solutions");

        CompanygetResponseDTO companyDto = new CompanygetResponseDTO();
        companyDto.setName("Local Solutions");

        Mockito.when(companyRepository.findByLocation("New York"))
                .thenReturn(List.of(company));
        Mockito.when(modelMapper.map(Mockito.anyList(), Mockito.eq(new TypeToken<List<CompanygetResponseDTO>>() {}.getType())))
                .thenReturn(List.of(companyDto));

        List<CompanygetResponseDTO> result = companyService.getCompanies("New York", null);

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Local Solutions", result.get(0).getName());
    }

    @Test
    void getCompaniesShouldReturnCompaniesForOnlyCategory() {
        Company company = new Company();
        company.setId(3L);
        company.setName("Category Experts");

        CompanygetResponseDTO companyDto = new CompanygetResponseDTO();
        companyDto.setName("Category Experts");

        Mockito.when(companyRepository.findByCategory("Finance"))
                .thenReturn(List.of(company));
        Mockito.when(modelMapper.map(Mockito.anyList(), Mockito.eq(new TypeToken<List<CompanygetResponseDTO>>() {}.getType())))
                .thenReturn(List.of(companyDto));

        List<CompanygetResponseDTO> result = companyService.getCompanies(null, "Finance");

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Category Experts", result.get(0).getName());
    }

    @Test
    void getCompaniesShouldReturnAllCompaniesWhenNoFiltersProvided() {
        Company company1 = new Company();
        company1.setId(4L);
        company1.setName("General Solutions");

        Company company2 = new Company();
        company2.setId(5L);
        company2.setName("Tech World");

        CompanygetResponseDTO companyDto1 = new CompanygetResponseDTO();
        companyDto1.setName("General Solutions");

        CompanygetResponseDTO companyDto2 = new CompanygetResponseDTO();
        companyDto2.setName("Tech World");

        Mockito.when(companyRepository.findAll())
                .thenReturn(List.of(company1, company2));
        Mockito.when(modelMapper.map(Mockito.anyList(), Mockito.eq(new TypeToken<List<CompanygetResponseDTO>>() {}.getType())))
                .thenReturn(List.of(companyDto1, companyDto2));

        List<CompanygetResponseDTO> result = companyService.getCompanies(null, null);

        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("General Solutions", result.get(0).getName());
        Assertions.assertEquals("Tech World", result.get(1).getName());
    }

    @Test
    void getCompaniesShouldThrowExceptionWhenNoCompaniesFound() {
        Mockito.when(companyRepository.findAll()).thenReturn(List.of());
        
        RuntimeException exception = Assertions.assertThrows(RuntimeException.class,
                () -> companyService.getCompanies(null, null));
        Assertions.assertEquals("No companies found for the given filters.", exception.getMessage());
    }


    @Test
    void saveCompanyShouldAddNewCompany() {
        CompanySaveRequestDTO saveRequestDTO = new CompanySaveRequestDTO();
        saveRequestDTO.setName("Tech Solutions");
        saveRequestDTO.setLocation("New York");

        Company company = new Company();
        company.setName("Tech Solutions");

        Mockito.when(companyRepository.findByName("Tech Solutions")).thenReturn(Optional.empty());
        Mockito.when(modelMapper.map(saveRequestDTO, Company.class)).thenReturn(company);

        String result = companyService.saveCompany(saveRequestDTO);

        Assertions.assertEquals("Company saved successfully", result);
    }

    @Test
    void updateCompanyShouldUpdateCompanyDetails() {
        CompanyUpdateRequestDTO updateRequestDTO = new CompanyUpdateRequestDTO();
        updateRequestDTO.setId(1L);
        updateRequestDTO.setName("Tech Solutions Updated");

        Company company = new Company();
        company.setId(1L);

        Mockito.when(companyRepository.existsById(1L)).thenReturn(true);
        Mockito.when(modelMapper.map(updateRequestDTO, Company.class)).thenReturn(company);
        Mockito.when(companyRepository.save(company)).thenReturn(company);

        String result = companyService.updateCompany(updateRequestDTO);

        Assertions.assertEquals("Updated successfully", result);
    }

    @Test
    void getAllCompaniesShouldReturnAllCompanies() {
        Company company = new Company();
        company.setId(1L);
        company.setName("Tech Solutions");

        CompanygetResponseDTO companyDto = new CompanygetResponseDTO();
        companyDto.setName("Tech Solutions");

        Mockito.when(companyRepository.findAll()).thenReturn(List.of(company));
        Mockito.when(modelMapper.map(Mockito.anyList(), Mockito.eq(new TypeToken<List<CompanygetResponseDTO>>() {}.getType())))
                .thenReturn(List.of(companyDto));

        List<CompanygetResponseDTO> result = companyService.getAllCompanies();

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Tech Solutions", result.get(0).getName());
    }

    @Test
    void deleteCompanyShouldRemoveCompany() {
        Mockito.when(companyRepository.existsById(1L)).thenReturn(true);

        companyService.deleteCompany(1L);

        Mockito.verify(companyRepository, Mockito.times(1)).deleteById(1L);
    }

    @Test
    void searchCompanyByNameShouldReturnMatchingCompanies() {
        Company company = new Company();
        company.setId(1L);
        company.setName("Tech Solutions");

        CompanygetResponseDTO companyDto = new CompanygetResponseDTO();
        companyDto.setName("Tech Solutions");

        Mockito.when(companyRepository.findByNameContainingIgnoreCase("Tech"))
                .thenReturn(List.of(company));
        Mockito.when(modelMapper.map(Mockito.anyList(), Mockito.eq(new TypeToken<List<CompanygetResponseDTO>>() {}.getType())))
                .thenReturn(List.of(companyDto));

        List<CompanygetResponseDTO> result = companyService.searchCompanyByName("Tech");

        Assertions.assertEquals(1, result.size());
        Assertions.assertEquals("Tech Solutions", result.get(0).getName());
    }

}
