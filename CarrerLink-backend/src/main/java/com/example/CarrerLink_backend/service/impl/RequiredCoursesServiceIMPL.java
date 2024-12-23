package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.entity.RequiredCources;
import com.example.CarrerLink_backend.repo.RequiredCoursesRepo;
import com.example.CarrerLink_backend.service.RequirdCoursesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequiredCoursesServiceIMPL implements RequirdCoursesService {
    @Autowired
    private RequiredCoursesRepo requiredCoursesRepo;

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
       /* List<RequiredCources> getAllRequiredCourses = requiredCoursesRepo.findAll();
        List<RequireCoursesDTO> requireCoursesDTOList = new ArrayList<>();
        for (RequiredCources requiredCources : getAllRequiredCourses) {
            RequireCoursesDTO requireCoursesDTO = new RequireCoursesDTO(
                    requiredCources.getCourceId(),
                    requiredCources.getCourceName(),
                    requiredCources.getRequiredSkill(),
                    requiredCources.getSkillLevel()
            );
            requireCoursesDTOList.add(requireCoursesDTO);
        }
        return requireCoursesDTOList;*/
        return null;
    }

    @Override
    public RequireCoursesDTO getRequiredCoursesById(int id) {
      /*  if (requiredCoursesRepo.findById(id).isPresent()) {
            RequiredCources requiredCources = requiredCoursesRepo.findById(id).get();
            RequireCoursesDTO requireCoursesDTO = new RequireCoursesDTO(
                    requiredCources.getCourceId(),
                    requiredCources.getCourceName(),
                    requiredCources.getRequiredSkill(),
                    requiredCources.getSkillLevel()
            );
            return requireCoursesDTO;
        }*/
        return null;
    }
}
