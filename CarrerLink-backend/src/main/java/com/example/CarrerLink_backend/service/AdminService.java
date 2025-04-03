package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.AdminSaveRequestDTO;
import com.example.CarrerLink_backend.dto.JobFieldDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;
import com.example.CarrerLink_backend.dto.response.AdminGetResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;

public interface AdminService {
    String saveTechnology(TechnologyDTO technologyDTO);
    String saveJobField(JobFieldDTO jobFieldDTO);
    TechnologyDTO getTechnology(int id);
    TechnologyDTO updateTechnology(int id,TechnologyDTO technologyDTO);
    void deleteTechnology(int id);

    String save(AdminSaveRequestDTO adminSaveRequestDTO, UserEntity userdata);

    AdminGetResponseDTO getAdminByUserId(int userId);
}
