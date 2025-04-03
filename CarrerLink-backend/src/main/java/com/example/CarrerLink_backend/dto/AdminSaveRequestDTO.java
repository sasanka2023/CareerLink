package com.example.CarrerLink_backend.dto;

import com.example.CarrerLink_backend.dto.request.UserSaveRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminSaveRequestDTO {


    private String fullName;

    private String email;

    private String profession;

    private UserSaveRequestDTO userSaveRequestDTO;
}
