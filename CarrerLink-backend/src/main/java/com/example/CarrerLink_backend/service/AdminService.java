package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.AdminSaveRequestDTO;
import com.example.CarrerLink_backend.dto.JobFieldDTO;
import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;
import com.example.CarrerLink_backend.dto.response.AdminGetResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;

import java.util.List;

public interface AdminService {
    String saveTechnology(TechnologyDTO technologyDTO);
    String saveJobField(JobFieldDTO jobFieldDTO);
    TechnologyDTO getTechnology(int id);
    TechnologyDTO updateTechnology(int id,TechnologyDTO technologyDTO);
    void deleteTechnology(int id);

    void saveCourses(RequireCoursesDTO requireCoursesDTO);
    void deleteCourses(int id);
    RequireCoursesDTO getCourses(int id);
    RequireCoursesDTO updateCourses(int id,RequireCoursesDTO requireCoursesDTO);

    String save(AdminSaveRequestDTO adminSaveRequestDTO, UserEntity userdata);

    AdminGetResponseDTO getAdminByUserId(int userId);

    List<AdminGetResponseDTO> getAllAdmins();

    String approveAdmin(int id,AdminGetResponseDTO adminGetResponseDTO);
    List<RequireCoursesDTO> getAllRequiredCourses();
}
