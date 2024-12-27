package com.example.CarrerLink_backend.controller;


import com.example.CarrerLink_backend.dto.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.service.StudentService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<StandardResponse> saveStudent(@RequestBody StudentSaveRequestDTO studentSaveRequestDTO){

        String message = studentService.saveStudent(studentSaveRequestDTO);

        return ResponseEntity.status(201)
                .body(new StandardResponse(true, "Company saved successfully", message));

    }
}
