package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.dto.response.AdminGetResponseDTO;
import com.example.CarrerLink_backend.dto.response.CompanygetResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;
import com.example.CarrerLink_backend.repo.CVRepo;
import com.example.CarrerLink_backend.repo.JobFieldRepo;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
import com.example.CarrerLink_backend.repo.TestRepository;
import com.example.CarrerLink_backend.service.AdminService;
import com.example.CarrerLink_backend.service.impl.CountBroadcastService;
import com.example.CarrerLink_backend.service.impl.EmailService;
import com.example.CarrerLink_backend.service.impl.RequiredCoursesServiceIMPL;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/admin")
@CrossOrigin("http://localhost:3000")
@AllArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final CountBroadcastService countBroadcastService;

    private final RequiredCoursesServiceIMPL requiredCoursesServiceIMPL;
    private final JobFieldRepo jobFieldRepo;
    private final TechnologyRepo technologyRepo;
    private final EmailService emailService;
    private final CVRepo cvRepo;
    private TestRepository testRepository;

    @PostMapping("save")
    public ResponseEntity<StandardResponse> saveAdmin(@RequestBody AdminSaveRequestDTO adminSaveRequestDTO, UserEntity userdata){
        String message = adminService.save(adminSaveRequestDTO,userdata);
        return ResponseEntity.ok(new StandardResponse(true, "Admin saved successfully", message));

    }

    @PostMapping("/saveTechnology")
    public ResponseEntity<StandardResponse> saveTechnology(@RequestBody TechnologyDTO technologyDTO) {
        String message = adminService.saveTechnology(technologyDTO);
        countBroadcastService.broadcastCounts();
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
        countBroadcastService.broadcastCounts();
        return ResponseEntity.ok(new StandardResponse(true, "JobField saved successfully", message));
    }

    @PutMapping("/updateTechnology/{id}")
    public ResponseEntity<TechnologyDTO> updateTechnology(@PathVariable int id, @RequestBody TechnologyDTO technologyDTO) {
        TechnologyDTO updatedTechnologyDTO = adminService.updateTechnology(id, technologyDTO);
        return ResponseEntity.ok(updatedTechnologyDTO);
    }


    @PostMapping("/saveCourse")
    public ResponseEntity<String> saveCourse(@RequestBody RequireCoursesDTO requireCoursesDTO) {
        adminService.saveCourses(requireCoursesDTO);
        return ResponseEntity.ok("Courses Saved Successfully");
    }

    @DeleteMapping("/deleteCourse/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable int id) {
        adminService.deleteCourses(id);
        return ResponseEntity.ok("Courses Deleted Successfully");
    }

    @GetMapping("getCourse/{id}")
    public ResponseEntity<RequireCoursesDTO> getCourse(@PathVariable int id) {
        RequireCoursesDTO requireCoursesDTO = adminService.getCourses(id);
        return ResponseEntity.ok(requireCoursesDTO);
    }

    @PutMapping("updateCourse/{id}")
    public ResponseEntity<RequireCoursesDTO> updateCourse(@PathVariable int id, @RequestBody RequireCoursesDTO requireCoursesDTO) {
        RequireCoursesDTO updaterequireCoursesDTO = adminService.updateCourses(id, requireCoursesDTO);
        return ResponseEntity.ok(updaterequireCoursesDTO);
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

    @GetMapping("/getAll")
    public ResponseEntity<StandardResponse> getAllAdmins() {
        List<AdminGetResponseDTO> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(new StandardResponse(true, "Admins fetched successfully", admins));
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<StandardResponse> approveAdmin(@PathVariable int id, @RequestBody AdminGetResponseDTO adminGetResponseDTO) {
        String message = adminService.approveAdmin(id,adminGetResponseDTO);
        return ResponseEntity.ok(new StandardResponse(true, "Admin approved successfully", message));

    }
    @GetMapping(path = "/get-all-required-courses")
    public List<RequireCoursesDTO> getAllRequiredCourses() {
        List<RequireCoursesDTO> allRequireCourses = requiredCoursesServiceIMPL.getAllRequiredCourses();
        return allRequireCourses;
    }

    @GetMapping(path="get-all-job-fields")
    public ResponseEntity<StandardResponse> getAllJobFields() {
        List<JobFieldDTO> allJobFields = adminService.getAllJobFields();
        return ResponseEntity.ok(new StandardResponse(true, "Job fields fetched successfully", allJobFields));
    }

    @GetMapping(path="get-all-technologies")
    public ResponseEntity<StandardResponse> getAllTechnologies() {
        List<TechnologyDTO> allTechnologies = adminService.getAllTechnologies();
        return ResponseEntity.ok(new StandardResponse(true, "Technologies fetched successfully", allTechnologies));
    }

    @GetMapping("/dashboard-counts")
    public ResponseEntity<StandardResponse> getDashboardCounts() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("technologies", technologyRepo.count());
        counts.put("jobFields", jobFieldRepo.count());
        counts.put("cvs",cvRepo.count());
        counts.put("tests",cvRepo.count());
        return ResponseEntity.ok(new StandardResponse(true, "Dashboard counts", counts));
    }

    @GetMapping("/student-technology-counts")
    public ResponseEntity<StandardResponse> getStudentTechnologyCounts() {
        List<TechnologyStudentCount> counts = adminService.getStudentCountPerTechnology();
        return ResponseEntity.ok(new StandardResponse(true, "Technology student counts", counts));
    }
    @GetMapping("/student-jobfield-counts")
    public ResponseEntity<StandardResponse> getStudentJobFieldCounts() {
        List<JobFieldStudentCount> counts = adminService.getStudentCountPerJobField();
        return ResponseEntity.ok(new StandardResponse(true, "Job Field student counts", counts));
    }

}
