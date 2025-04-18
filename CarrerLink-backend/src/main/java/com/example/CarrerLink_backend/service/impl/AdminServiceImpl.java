package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.AdminSaveRequestDTO;
import com.example.CarrerLink_backend.dto.JobFieldDTO;
import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;

import com.example.CarrerLink_backend.entity.JobField;
import com.example.CarrerLink_backend.entity.RequiredCourses;
import com.example.CarrerLink_backend.entity.Technology;

import com.example.CarrerLink_backend.dto.response.AdminGetResponseDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.repo.*;

import com.example.CarrerLink_backend.service.AdminService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import com.example.CarrerLink_backend.entity.AcademicCourse;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class AdminServiceImpl implements AdminService {

    private final TechnologyRepo technologyRepo;
    private final JobFieldRepo jobFieldRepo;
    private final AcademicCourseRepo AcedeminCoursesRepo;
    private final ModelMapper modelMapper;
    private final AdminRepo adminRepo;
    private final UserRepo userRepo;


    @Override
    public String saveTechnology(TechnologyDTO technologyDTO) {
        Technology technology = modelMapper.map(technologyDTO, Technology.class);
        technologyRepo.save(technology);
        return "Technology saved successfully";
    }

    @Override
    public String saveJobField(JobFieldDTO jobFieldDTO) {
        JobField jobField = modelMapper.map(jobFieldDTO, JobField.class);
        jobFieldRepo.save(jobField);
        return "Jobfield saved successfully";
    }

    @Override
    public TechnologyDTO getTechnology(int id) {
        Technology technology = technologyRepo.findById(id).orElseThrow(() -> new RuntimeException("Technology Not Found with ID : " + id));
        return modelMapper.map(technology, TechnologyDTO.class);
    }

    @Override
    public TechnologyDTO updateTechnology(int id,TechnologyDTO updateTechnologyDTO) {
        Optional<Technology> optionalTechnology = technologyRepo.findById(id);

        if (optionalTechnology.isPresent()) {
            Technology technology = optionalTechnology.get();
            technology.setTechName(updateTechnologyDTO.getTechName());
            technologyRepo.save(technology);
            return modelMapper.map(technology, TechnologyDTO.class);
        }
        else {
            throw new RuntimeException("Technology Not Found with ID : " + id);
        }
    }

    @Override
    public void deleteTechnology(int id) {
        if (technologyRepo.existsById(id)){
            technologyRepo.deleteById(id);
        }
        else {
            throw new RuntimeException("Technology Not Found with ID : " + id);
        }
    }

    @Override

    public void saveCourses(RequireCoursesDTO requireCoursesDTO) {
        AcademicCourse requiredCourses = modelMapper.map(requireCoursesDTO, AcademicCourse.class);
        AcedeminCoursesRepo.save(requiredCourses);
    }

    @Override
    public void deleteCourses(int id) {
        if (AcedeminCoursesRepo.existsById((long) id)){
            AcedeminCoursesRepo.deleteById((long) id);
        }
        else {
            throw new RuntimeException("Courses Not Found with ID : " + id);
        }
    }

    @Override
    public RequireCoursesDTO getCourses(int id) {
        AcademicCourse requiredCourses = AcedeminCoursesRepo.findById((long) id).orElseThrow(() -> new RuntimeException("Courses Not Found with ID : " + id));
        return modelMapper.map(requiredCourses, RequireCoursesDTO.class);
    }

    @Override
    public RequireCoursesDTO updateCourses(int id, RequireCoursesDTO requireCoursesDTO) {
        Optional<AcademicCourse> optionalRequiredCourses = AcedeminCoursesRepo.findById((long) id);

        if (optionalRequiredCourses.isPresent()) {
            AcademicCourse requiredCourses = optionalRequiredCourses.get();
            requiredCourses.setCourseName(requireCoursesDTO.getCourseName());
            requiredCourses.setRequiredSkill(requireCoursesDTO.getRequiredSkill());
            requiredCourses.setSkillLevel(requireCoursesDTO.getSkillLevel());
            AcedeminCoursesRepo.save(requiredCourses);
            return modelMapper.map(requiredCourses, RequireCoursesDTO.class);
        } else {
            throw new RuntimeException("Courses Not Found with ID : " + id);
        }
    }

    public String save(AdminSaveRequestDTO adminSaveRequestDTO, UserEntity userdata) {
        Admin admin = modelMapper.map(adminSaveRequestDTO, Admin.class);
        admin.setUser(userdata);
        adminRepo.save(admin);
        return "admin "+admin.getFullName()+" saved successfully";
    }

    @Override
    public AdminGetResponseDTO getAdminByUserId(int userId) {
        UserEntity user = userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        Admin admin = adminRepo.findByUser(user).orElseThrow(()->new RuntimeException("Admin not found"));
        return modelMapper.map(admin, AdminGetResponseDTO.class);
    }

    @Override
    public List<AdminGetResponseDTO> getAllAdmins() {
        List<Admin> admins = adminRepo.findAll();
        List<AdminGetResponseDTO> adminGetResponseDTOS = modelMapper.map(admins, new TypeToken<List<AdminGetResponseDTO>>() {}.getType());
        return adminGetResponseDTOS;
    }

    @Override
    public String approveAdmin(int id,AdminGetResponseDTO adminGetResponseDTO) {
        Admin admin = adminRepo.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));

        // Only update the status field (or any other fields you want to change)
        admin.setStatus(adminGetResponseDTO.isStatus());
        adminRepo.save(admin);
        return "admin "+admin.getFullName()+" approved successfully";



    }

    @Override
    public List<RequireCoursesDTO> getAllRequiredCourses() {
        List<AcademicCourse> getAllRequiredCourses = AcedeminCoursesRepo.findAll();
        return modelMapper.map(getAllRequiredCourses,new TypeToken<List<RequireCoursesDTO>>() {}.getType());
    }
}
