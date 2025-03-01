package com.example.CarrerLink_backend.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompanySaveRequestDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String mobile;
    private String location;
    private String coverImage;
    private String email;
    private String requirements;
    private String website;
    private String size;
    private UserSaveRequestDTO userSaveRequestDTO;
}
