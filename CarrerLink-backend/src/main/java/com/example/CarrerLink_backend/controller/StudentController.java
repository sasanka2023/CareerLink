package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.dto.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.StudentUpdateRequestDTO;
import com.example.CarrerLink_backend.service.StudentService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/students")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;


    @Operation(summary = "Save a student")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "student created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    public ResponseEntity<StandardResponse> saveStudent(@RequestBody StudentSaveRequestDTO studentSaveRequestDTO){

        String message = studentService.saveStudent(studentSaveRequestDTO);

        return ResponseEntity.status(201)
                .body(new StandardResponse(true, "Company saved successfully", message));

    }

    @Operation(summary = "Update student")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "student updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping
    public ResponseEntity<StandardResponse> updateStudent(@RequestBody StudentUpdateRequestDTO studentUpdateRequestDTO){
        String message = studentService.updateStudent(studentUpdateRequestDTO);

        return ResponseEntity.ok(new StandardResponse(true, "Company updated successfully", message));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<StandardResponse> deleteStudent(@PathVariable int id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(new StandardResponse(true, "Company deleted successfully", null));
    }
}
