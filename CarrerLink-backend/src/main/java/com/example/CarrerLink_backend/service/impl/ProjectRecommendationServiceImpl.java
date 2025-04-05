package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.ProjectIdeaDTO;
import com.example.CarrerLink_backend.entity.Technology;
import com.example.CarrerLink_backend.repo.StudentRepo;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
import com.example.CarrerLink_backend.service.ProjectRecommendationService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectRecommendationServiceImpl implements ProjectRecommendationService {

    private final StudentRepo studentRepo;
    private final TechnologyRepo technologyRepo;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Override
    @Transactional(readOnly = true)
    public List<ProjectIdeaDTO> getProjectRecommendations(int studentId) {
        log.info("Fetching project recommendations for student ID: {}", studentId);

        if (!studentRepo.existsById(studentId)) {
            log.error("Student not found with ID: {}", studentId);
            return Collections.singletonList(createDefaultProjectDTO("Student not found"));
        }

        List<Technology> technologies = technologyRepo.findByStudents_studentId(studentId);
        log.info("Found {} technologies for student ID: {}", technologies.size(), studentId);

        if (technologies.isEmpty()) {
            return Collections.singletonList(createDefaultProjectDTO("No technologies found in profile"));
        }

        String prompt = buildProjectPrompt(technologies);
        log.debug("Generated Gemini Prompt:\n{}", prompt);

        try {
            String response = webClient.post()
                    .uri(geminiApiUrl + "?key=" + geminiApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(createGeminiRequest(prompt))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            log.debug("Raw Gemini API Response:\n{}", response);

            // Parse the JSON response to extract the text content
            JsonNode rootNode = objectMapper.readTree(response);
            String textContent = rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            log.debug("Extracted text content:\n{}", textContent);
            return parseGeminiResponse(textContent);
        } catch (Exception e) {
            log.error("Error while getting project recommendations", e);
            return Collections.singletonList(createDefaultProjectDTO("Error generating recommendations"));
        }
    }

    private Map<String, Object> createGeminiRequest(String prompt) {
        Map<String, Object> request = new HashMap<>();
        Map<String, Object> content = new HashMap<>();
        Map<String, String> part = new HashMap<>();

        part.put("text", prompt);
        content.put("parts", Collections.singletonList(part));
        request.put("contents", Collections.singletonList(content));
        return request;
    }

    private String buildProjectPrompt(List<Technology> technologies) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate exactly 5 practical project ideas using these technologies. ");
        prompt.append("For each project, provide:\n\n");
        prompt.append("Title: [Project Name]\n");
        prompt.append("Description: [2-3 sentence description]\n");
        prompt.append("Technologies: [comma-separated list of technologies used]\n");
        prompt.append("Difficulty: [Beginner/Intermediate/Advanced]\n\n");

        prompt.append("Technologies available:\n");
        technologies.forEach(tech -> prompt.append("- ").append(tech.getTechName()).append("\n"));

        prompt.append("\nExample:\n");
        prompt.append("Title: Task Manager\n");
        prompt.append("Description: A web app to manage tasks with drag-and-drop functionality\n");
        prompt.append("Technologies: React, Node.js, MongoDB\n");
        prompt.append("Difficulty: Beginner\n\n");

        prompt.append("Now generate exactly 5 projects following this exact format.");
        return prompt.toString();
    }

    private List<ProjectIdeaDTO> parseGeminiResponse(String responseText) {
        if (responseText == null || responseText.isEmpty()) {
            return Collections.singletonList(createDefaultProjectDTO("No response from AI service"));
        }

        try {
            // Split by double newlines to separate projects
            String[] projects = responseText.split("\n\n");

            return Arrays.stream(projects)
                    .map(this::parseProjectBlock)
                    .filter(Objects::nonNull)
                    .limit(5)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error parsing response", e);
            return Collections.singletonList(createDefaultProjectDTO("Error parsing response"));
        }
    }

    private ProjectIdeaDTO parseProjectBlock(String block) {
        try {
            String[] lines = block.split("\n");
            if (lines.length < 4) {
                log.warn("Incomplete project block: {}", block);
                return null;
            }

            return new ProjectIdeaDTO(
                    lines[0].replace("Title:", "").trim(),
                    lines[1].replace("Description:", "").trim(),
                    Arrays.stream(lines[2].replace("Technologies:", "").split(","))
                            .map(String::trim)
                            .collect(Collectors.toList()),
                    lines[3].replace("Difficulty:", "").trim()
            );
        } catch (Exception e) {
            log.error("Error parsing project block", e);
            return null;
        }
    }

    private ProjectIdeaDTO createDefaultProjectDTO(String message) {
        return new ProjectIdeaDTO(
                "Service Unavailable",
                message,
                Collections.emptyList(),
                "N/A"
        );
    }
}