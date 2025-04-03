package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.dto.AdminSaveRequestDTO;
import com.example.CarrerLink_backend.dto.JobFieldDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;
import com.example.CarrerLink_backend.dto.response.AdminGetResponseDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.service.AdminService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("api/admin")
@AllArgsConstructor
public class AdminController {
    private AdminService adminService;


    @PostMapping("save")
    public ResponseEntity<StandardResponse> saveAdmin(@RequestBody AdminSaveRequestDTO adminSaveRequestDTO, UserEntity userdata){
        String message = adminService.save(adminSaveRequestDTO,userdata);
        return ResponseEntity.ok(new StandardResponse(true, "Admin saved successfully", message));

    }

    @PostMapping("/saveTechnology")
    public ResponseEntity<StandardResponse> saveTechnology(@RequestBody TechnologyDTO technologyDTO) {
        String message = adminService.saveTechnology(technologyDTO);
        return ResponseEntity.ok(new StandardResponse(true, "Technology saved successfully", message));
    }

    @GetMapping("/getTechnology/{id}")
    public ResponseEntity<TechnologyDTO> getTechnology(@PathVariable int id) {
        TechnologyDTO technologyDTO = adminService.getTechnology(id);
        return ResponseEntity.ok(technologyDTO);
    }

    @DeleteMapping("/deleteTechnology/{id}")
    public ResponseEntity<String> deleteTechnology(@PathVariable int id) {
        adminService.deleteTechnology(id);
        return ResponseEntity.ok("Technology Deleted Successfully");
    }

    @PostMapping("/saveJobField")
    public ResponseEntity<StandardResponse> saveJobField(@RequestBody JobFieldDTO jobFieldDTO) {
        String message = adminService.saveJobField(jobFieldDTO);
        return ResponseEntity.ok(new StandardResponse(true, "JobField saved successfully", message));
    }

    @PutMapping("/updateTechnology/{id}")
    public ResponseEntity<TechnologyDTO> updateTechnology(@PathVariable int id, @RequestBody TechnologyDTO technologyDTO) {
        TechnologyDTO updatedTechnologyDTO = adminService.updateTechnology(id, technologyDTO);
        return ResponseEntity.ok(updatedTechnologyDTO);
    }

    @Operation(summary = "Get company by userid")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all applicants"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/userId/{userId}")
    public ResponseEntity<StandardResponse> getAdminById(@PathVariable int userId){
        AdminGetResponseDTO admin = adminService.getAdminByUserId(userId);
        return ResponseEntity.ok(new StandardResponse(true, "Applicants fetched successfully", admin));
    }

}
