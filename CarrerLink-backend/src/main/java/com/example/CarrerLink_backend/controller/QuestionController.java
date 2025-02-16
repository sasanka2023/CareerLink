package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.response.QuestionResponseDTO;
import com.example.CarrerLink_backend.service.QuestionService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/questions")
@AllArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @Operation(summary = "Get questions by test", description = "Fetch all questions for a given test")
    @GetMapping("/byTest")
    public ResponseEntity<StandardResponse> getQuestionsByTest(@RequestParam Integer testId) {
        List<QuestionResponseDTO> questions = questionService.getQuestionsByTest(testId);
        return ResponseEntity.ok(new StandardResponse(true, "Questions fetched successfully", questions));
    }

    @Operation(summary = "Save a question", description = "Save a new question under a test")
    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveQuestion(
            @RequestBody QuestionResponseDTO questionResponseDTO, @RequestParam Integer testId) {
        String msg = questionService.saveQuestion(questionResponseDTO, testId);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }

    @Operation(summary = "Update a question", description = "Update an existing question")
    @PutMapping("/update")
    public ResponseEntity<StandardResponse> updateQuestion(@RequestBody QuestionResponseDTO questionResponseDTO) {
        String msg = questionService.updateQuestion(questionResponseDTO);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }

    @Operation(summary = "Delete a question", description = "Delete a question by ID")
    @DeleteMapping("/delete")
    public ResponseEntity<StandardResponse> deleteQuestion(@RequestParam Integer questionId) {
        String msg = questionService.deleteQuestion(questionId);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }
}
