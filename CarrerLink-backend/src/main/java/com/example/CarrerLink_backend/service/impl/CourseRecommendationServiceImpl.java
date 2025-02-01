package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.response.GeminiResponse;
import com.example.CarrerLink_backend.entity.SkillSet;
import com.example.CarrerLink_backend.repo.SkillSetRepo;
import com.example.CarrerLink_backend.service.CourseRecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.stream.Collectors;

import com.example.CarrerLink_backend.config.WebClientConfig;

@Service
@RequiredArgsConstructor
public class CourseRecommendationServiceImpl implements CourseRecommendationService {

    private final SkillSetRepo skillSetRepo;
    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Override
    public List<String> getRecommendedCourses(int studentId) {
        List<SkillSet> skills = skillSetRepo.findByStudent_StudentId(studentId);

        if (skills.isEmpty()) {
            return List.of("No skills found for this student.");
        }

        String prompt = generatePrompt(skills);
        return fetchRecommendationsFromGemini(prompt);
    }

    private String generatePrompt(List<SkillSet> skills) {
        StringBuilder prompt = new StringBuilder("Suggest the top 5 online courses for the following skills and levels:\n");

        // Loop through all the skills of the student and enhance the prompt
        for (SkillSet skill : skills) {
            prompt.append("For ").append(skill.getSkillName())
                    .append(" (Level: ").append(skill.getSkillLevel()).append("), recommend courses that are most relevant and suitable.\n");
        }

        return prompt.toString();
    }

    private List<String> fetchRecommendationsFromGemini(String prompt) {
        String apiUrl = geminiApiUrl + geminiApiKey;

        // Define request payload
        String requestBody = """
        {
            "contents": [
                {
                    "parts": [
                        {
                            "text": "%s"
                        }
                    ]
                }
            ]
        }
    """.formatted(prompt);

        // Make API request using WebClient
        return webClient.post()
                .uri(apiUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(status -> status.isError(), response -> {
                    // Log the error message and return a Mono.error with a custom exception
                    return response.bodyToMono(String.class)
                            .flatMap(errorMessage -> Mono.error(new RuntimeException("Error fetching recommendations: " + errorMessage)));
                })
                .bodyToMono(GeminiResponse.class)
                .map(response -> {
                    System.out.println("API Response: " + response);  // Log the full response for debugging
                    return response.getTextResults();
                })
                .block(); // Blocking call for simplicity, use reactive approach in real apps
    }


}
