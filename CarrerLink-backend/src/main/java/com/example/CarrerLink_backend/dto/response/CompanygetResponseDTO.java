package com.example.CarrerLink_backend.dto.response;


import com.example.CarrerLink_backend.dto.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompanygetResponseDTO {

    private Long id;
    private String name;
    private String logo;
    private String description;
    private String category;
    private String mobile;
    private String location;
    private String coverImage;
    private String email;
    private String requirements;
    private String website;
    private List<ClientDTO> clients;
    private List<JobgetResponseDTO> jobs;
    private List<TechnologyDTO> technologies;
    private List<ReviewDTO> reviews;
    private List<ProductDTO> products;

}

