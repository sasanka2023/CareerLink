package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.RequireCoursesDTO;

import java.util.List;

public interface RequirdCoursesService {
    List<RequireCoursesDTO> getAllRequiredCourses();

    RequireCoursesDTO getRequiredCoursesById(int id);
}
