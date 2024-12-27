package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.JobgetResponseDTO;
import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.entity.RequiredCources;
import com.example.CarrerLink_backend.repo.RequiredCoursesRepo;
import com.example.CarrerLink_backend.service.RequirdCoursesService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequiredCoursesServiceIMPL implements RequirdCoursesService {
    @Autowired
    private RequiredCoursesRepo requiredCoursesRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveRequiredCourses(RequireCoursesDTO requireCoursesDTO) {
       /* RequiredCources requiredCources = new RequiredCources(
                requireCoursesDTO.getCourceId(),
                requireCoursesDTO.getCourceName(),
                requireCoursesDTO.getRequiredSkill(),
                requireCoursesDTO.getSkillLevel()
        );
        requiredCoursesRepo.save(requiredCources);
        return requireCoursesDTO.getCourceName();*/
        return null;
    }

    @Override
    public List<RequireCoursesDTO> getAllRequiredCourses() {
        List<RequiredCources> getAllRequiredCourses = requiredCoursesRepo.findAll();
        return modelMapper.map(getAllRequiredCourses,new TypeToken<List<RequireCoursesDTO>>() {}.getType());


    }

    @Override
    public RequireCoursesDTO getRequiredCoursesById(int id) {
        List<RequiredCources> getAllRequiredCourses = requiredCoursesRepo.findAll();
        return modelMapper.map(getAllRequiredCourses,new TypeToken<List<RequireCoursesDTO>>() {}.getType());


    }
}
