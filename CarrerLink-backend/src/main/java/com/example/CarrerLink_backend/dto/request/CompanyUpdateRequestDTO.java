package com.example.CarrerLink_backend.dto.request;

import com.example.CarrerLink_backend.dto.ClientDTO;
import com.example.CarrerLink_backend.dto.ProductDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompanyUpdateRequestDTO {
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
    private List<TechnologyDTO> technologies;
    private List<ProductDTO> products;
}
