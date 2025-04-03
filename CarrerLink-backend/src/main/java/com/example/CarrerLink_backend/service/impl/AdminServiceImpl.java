package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.JobFieldDTO;
import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;
import com.example.CarrerLink_backend.entity.JobField;
import com.example.CarrerLink_backend.entity.RequiredCourses;
import com.example.CarrerLink_backend.entity.Technology;
import com.example.CarrerLink_backend.repo.JobFieldRepo;
import com.example.CarrerLink_backend.repo.RequiredCoursesRepo;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
import com.example.CarrerLink_backend.service.AdminService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor

public class AdminServiceImpl implements AdminService {

    private final TechnologyRepo technologyRepo;
    private final JobFieldRepo jobFieldRepo;
    private final RequiredCoursesRepo requiredCoursesRepo;
    private final ModelMapper modelMapper;
    @Override
    public void saveTechnology(TechnologyDTO technologyDTO) {
        Technology technology = modelMapper.map(technologyDTO, Technology.class);
        technologyRepo.save(technology);
    }

    @Override
    public void saveJobField(JobFieldDTO jobFieldDTO) {
        JobField jobField = modelMapper.map(jobFieldDTO, JobField.class);
        jobFieldRepo.save(jobField);
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
        RequiredCourses requiredCourses = modelMapper.map(requireCoursesDTO, RequiredCourses.class);
        requiredCoursesRepo.save(requiredCourses);
    }

    @Override
    public void deleteCourses(int id) {
        if (requiredCoursesRepo.existsById(id)){
            requiredCoursesRepo.deleteById(id);
        }
        else {
            throw new RuntimeException("Courses Not Found with ID : " + id);
        }
    }

    @Override
    public RequireCoursesDTO getCourses(int id) {
        RequiredCourses requiredCourses = requiredCoursesRepo.findById(id).orElseThrow(() -> new RuntimeException("Courses Not Found with ID : " + id));
        return modelMapper.map(requiredCourses, RequireCoursesDTO.class);
    }

    @Override
    public RequireCoursesDTO updateCourses(int id, RequireCoursesDTO requireCoursesDTO) {
        Optional<RequiredCourses> optionalRequiredCourses = requiredCoursesRepo.findById(id);

        if (optionalRequiredCourses.isPresent()) {
            RequiredCourses requiredCourses = optionalRequiredCourses.get();
            requiredCourses.setCourseName(requireCoursesDTO.getCourceName());
            requiredCourses.setRequiredSkill(requireCoursesDTO.getRequiredSkill());
            requiredCourses.setSkillLevel(requireCoursesDTO.getSkillLevel());
            requiredCoursesRepo.save(requiredCourses);
            return modelMapper.map(requiredCourses, RequireCoursesDTO.class);
        }
        else {
            throw new RuntimeException("Courses Not Found with ID : " + id);
        }
    }
}
