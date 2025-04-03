package com.example.CarrerLink_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminGetResponseDTO {
    private int id;


    private String fullName;

    private String email;

    private String profession;
    private boolean status;
}
