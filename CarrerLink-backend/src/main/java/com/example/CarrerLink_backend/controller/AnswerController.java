package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.dto.response.AnswerResponseDTO;
import com.example.CarrerLink_backend.service.AnswerService;
import com.example.CarrerLink_backend.utill.StandardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/answers")
@AllArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @Operation(summary = "Get answers by question", description = "Fetch all answers for a given question")
    @GetMapping("/byQuestion")
    public ResponseEntity<StandardResponse> getAnswersByQuestion(@RequestParam Integer questionId) {
        List<AnswerResponseDTO> answers = answerService.getAnswersByQuestion(questionId);
        return ResponseEntity.ok(new StandardResponse(true, "Answers fetched successfully", answers));
    }

    @Operation(summary = "Save an answer", description = "Save a new answer under a question")
    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveAnswer(
            @RequestBody AnswerResponseDTO answerResponseDTO, @RequestParam Integer questionId) {
        String msg = answerService.saveAnswer(answerResponseDTO, questionId);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }

    @Operation(summary = "Update an answer", description = "Update an existing answer")
    @PutMapping("/update")
    public ResponseEntity<StandardResponse> updateAnswer(@RequestBody AnswerResponseDTO answerResponseDTO) {
        String msg = answerService.updateAnswer(answerResponseDTO);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }

    @Operation(summary = "Delete an answer", description = "Delete an answer by ID")
    @DeleteMapping("/delete")
    public ResponseEntity<StandardResponse> deleteAnswer(@RequestParam Integer answerId) {
        String msg = answerService.deleteAnswer(answerId);
        return ResponseEntity.ok(new StandardResponse(true, msg, null));
    }
}
