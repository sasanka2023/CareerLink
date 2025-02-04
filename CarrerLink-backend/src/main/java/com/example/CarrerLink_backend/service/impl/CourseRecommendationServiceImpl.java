package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.response.GeminiResponse;
import com.example.CarrerLink_backend.entity.SkillSet;
import com.example.CarrerLink_backend.repo.SkillSetRepo;
import com.example.CarrerLink_backend.service.CourseRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.stream.Collectors;

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

        for (SkillSet skill : skills) {
            prompt.append("For ").append(skill.getSkillName())
                    .append(" (Level: ").append(skill.getSkillLevel()).append("), recommend the most relevant courses.\n");
        }

        return prompt.toString();
    }

    private List<String> fetchRecommendationsFromGemini(String prompt) {
        String apiUrl = geminiApiUrl + "?key=" + geminiApiKey;

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

        try {
            GeminiResponse response = webClient.post()
                    .uri(apiUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(GeminiResponse.class)
                    .doOnError(error -> System.err.println("Error fetching recommendations from Gemini API: " + error.getMessage()))
                    .block();

            return response != null ? response.extractCourseList() : List.of("No recommendations found.");
        } catch (Exception e) {
            e.printStackTrace();
            return List.of("Error fetching recommendations from Gemini API.");
        }
    }
}
