package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.entity.AcademicCourse;
import com.example.CarrerLink_backend.entity.RequiredCourses;
import com.example.CarrerLink_backend.repo.RequiredCoursesRepo;
import com.example.CarrerLink_backend.service.RequirdCoursesService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequiredCoursesServiceIMPL implements RequirdCoursesService {
    @Autowired
    private RequiredCoursesRepo requiredCoursesRepo;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<RequireCoursesDTO> getAllRequiredCourses() {
        List<AcademicCourse> getAllRequiredCourses = requiredCoursesRepo.findAll();
        return modelMapper.map(getAllRequiredCourses,new TypeToken<List<RequireCoursesDTO>>() {}.getType());
    }

    @Override
    public RequireCoursesDTO getRequiredCoursesById(int id) {
        List<AcademicCourse> getAllRequiredCourses = requiredCoursesRepo.findAll();
        return modelMapper.map(getAllRequiredCourses,new TypeToken<List<RequireCoursesDTO>>() {}.getType());
    }
}
