package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.response.RecommendedCoursesDTO;
import com.example.CarrerLink_backend.dto.response.GeminiResponse;
import com.example.CarrerLink_backend.entity.SkillSet;
import com.example.CarrerLink_backend.repo.SkillSetRepo;
import com.example.CarrerLink_backend.service.CourseRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
    public List<RecommendedCoursesDTO> getRecommendedCourses(int studentId) {
        List<SkillSet> skills = skillSetRepo.findByStudent_StudentId(studentId);

        if (skills.isEmpty()) {
            return List.of(new RecommendedCoursesDTO("No skills found for this student.", ""));
        }

        String prompt = generatePrompt(skills);
        return fetchRecommendationsFromGemini(prompt);
    }

    private String generatePrompt(List<SkillSet> skills) {
        StringBuilder prompt = new StringBuilder("Suggest EXACTLY 3 online courses for each of the following skills. ");
        prompt.append("Format the response STRICTLY as: 'Course Name - URL'. ");
        prompt.append("Do NOT include explanations, descriptions, or markdown. Example:\n");
        prompt.append("Advanced Java Programming - https://udemy.com/advanced-java\n");
        prompt.append("Java Concurrency Masterclass - https://pluralsight.com/java-concurrency\n\n");
        prompt.append("Skills:\n");

        for (SkillSet skill : skills) {
            prompt.append("- ").append(skill.getSkillName())
                    .append(" (Level: ").append(skill.getSkillLevel()).append(")\n");
        }

        return prompt.toString();
    }

    private List<RecommendedCoursesDTO> fetchRecommendationsFromGemini(String prompt) {
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
                    .doOnError(error -> System.err.println("API Error: " + error.getMessage()))
                    .block();

            return (response != null) ? extractCourses(response)
                    : List.of(new RecommendedCoursesDTO("No recommendations found.", ""));

        } catch (Exception e) {
            return List.of(new RecommendedCoursesDTO("Error fetching courses.", ""));
        }
    }

    private List<RecommendedCoursesDTO> extractCourses(GeminiResponse response) {
        return response.extractCourseList().stream()
                .limit(3 * response.extractCourseList().size()) // Limit to 3 per skill
                .collect(Collectors.toList());
    }

//    private RecommendedCoursesDTO parseCourseInfo(String courseText) {
//        Pattern pattern = Pattern.compile("^(.*?)[\\s-]+(https?://\\S+)$");
//        Matcher matcher = pattern.matcher(courseText);
//
//        if (matcher.find()) {
//            return new RecommendedCoursesDTO(matcher.group(1).trim(), matcher.group(2).trim());
//        }
//        return new RecommendedCoursesDTO(courseText, "URL not available");
//    }
}
