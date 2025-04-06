// TestController.java
package com.example.CarrerLink_backend.controller;

import com.example.CarrerLink_backend.entity.Test;
import com.example.CarrerLink_backend.service.impl.TestServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin(origins = "http://localhost:3000") // Matches React default port
public class TestController {

    @Autowired
    private TestServiceImpl testService;

    @PostMapping
    public ResponseEntity<Test> createTest(@RequestBody Test test) {
        Test savedTest = testService.saveTest(test);
        return ResponseEntity.ok(savedTest);
    }

    @GetMapping
    public ResponseEntity<List<Test>> getAllTests() {
        List<Test> tests = testService.getAllTests();
        return ResponseEntity.ok(tests);
    }

    @GetMapping("/{testId}")
    public ResponseEntity<Test> getTestById(@PathVariable Long testId) {
        return testService.getTestById(testId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{testId}")
    public ResponseEntity<Test> updateTest(@PathVariable Long testId, @RequestBody Test test) {
        Test updatedTest = testService.updateTest(testId, test);
        return ResponseEntity.ok(updatedTest);
    }

    @DeleteMapping("/{testId}")
    public ResponseEntity<Void> deleteTest(@PathVariable Long testId) {
        testService.deleteTest(testId);
        return ResponseEntity.noContent().build();
    }
}