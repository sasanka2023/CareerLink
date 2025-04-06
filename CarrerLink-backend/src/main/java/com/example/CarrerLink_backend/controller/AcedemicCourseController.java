package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.dto.RequireCoursesDTO;
import com.example.CarrerLink_backend.service.AdminService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/acedemicCourses")
@CrossOrigin
public class AcedemicCourseController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/filter")
    public ResponseEntity<StandardResponse> getFilteredCourses(

            @RequestParam(required = false) String requiredSkill,
            @RequestParam(required = false) String skillLevel) {

        List<RequireCoursesDTO> acedemicCourses =  adminService.getAllCourses(requiredSkill, skillLevel);

        return ResponseEntity.ok(new StandardResponse(true, "Filtered courses fetched successfully", acedemicCourses));
    }

}
