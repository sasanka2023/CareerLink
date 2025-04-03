package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.service.impl.RequiredCoursesServiceIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/requiredCourses")
@CrossOrigin
public class RequiredCoursesController {
    @Autowired
    private RequiredCoursesServiceIMPL requiredCoursesServiceIMPL;


    @GetMapping(path = "/get-all-required-courses")
    public List<RequireCoursesDTO> getAllRequiredCourses() {
       List<RequireCoursesDTO> allRequireCourses = requiredCoursesServiceIMPL.getAllRequiredCourses();
        return allRequireCourses;
    }

    @GetMapping(
            path = "/get-required-courses-by-id",
            params = "id")

    public RequireCoursesDTO getRequiredCoursesById(@RequestParam int id) {
        return requiredCoursesServiceIMPL.getRequiredCoursesById(id);
    }
}
