package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.response.TestResponseDTO;
import com.example.CarrerLink_backend.service.TestService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tests")
@AllArgsConstructor
public class TestController {

    private final TestService testService;

    @Operation(summary = "Get all tests", description = "Fetch all available tests")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched all tests"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public ResponseEntity<StandardResponse> getTests() {
        List<TestResponseDTO> tests = testService.getTests();
        return ResponseEntity.ok(new StandardResponse(true, "Tests fetched successfully", tests));
    }

    @Operation(summary = "Save a test", description = "Save a new test")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully saved test"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveTest(@RequestBody TestResponseDTO testResponseDTO) {
        String msg = testService.saveTest(testResponseDTO);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }

    @Operation(summary = "Update a test", description = "Update an existing test")
    @PutMapping("/update")
    public ResponseEntity<StandardResponse> updateTest(@RequestBody TestResponseDTO testResponseDTO) {
        String msg = testService.updateTest(testResponseDTO);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }

    @Operation(summary = "Delete a test", description = "Delete a test by ID")
    @DeleteMapping("/delete")
    public ResponseEntity<StandardResponse> deleteTest(@RequestParam Integer testId) {
        String msg = testService.deleteTest(testId);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }
}
