package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.dto.JobFieldDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;
import com.example.CarrerLink_backend.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
@AllArgsConstructor
public class AdminController {
    private AdminService adminService;

    @PostMapping("/saveTechnology")
    public ResponseEntity<String> saveTechnology(@RequestBody TechnologyDTO technologyDTO) {
        adminService.saveTechnology(technologyDTO);
        return ResponseEntity.ok("Technology Saved Successfully");
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
    public ResponseEntity<String> saveJobField(@RequestBody JobFieldDTO jobFieldDTO) {
        adminService.saveJobField(jobFieldDTO);
        return ResponseEntity.ok("JobField Saved Successfully");
    }

    @PutMapping("/updateTechnology/{id}")
    public ResponseEntity<TechnologyDTO> updateTechnology(@PathVariable int id, @RequestBody TechnologyDTO technologyDTO) {
        TechnologyDTO updatedTechnologyDTO = adminService.updateTechnology(id, technologyDTO);
        return ResponseEntity.ok(updatedTechnologyDTO);
    }

}
