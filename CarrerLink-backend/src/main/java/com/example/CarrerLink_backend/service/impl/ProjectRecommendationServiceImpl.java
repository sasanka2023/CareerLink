// ProjectRecommendationServiceImpl.java
package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.ProjectIdeaDTO;
import com.example.CarrerLink_backend.entity.SkillSet;
import com.example.CarrerLink_backend.repo.SkillSetRepo;
import com.example.CarrerLink_backend.service.ProjectRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectRecommendationServiceImpl implements ProjectRecommendationService {

    private final SkillSetRepo skillSetRepo;
    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final Pattern PROJECT_PATTERN =
            Pattern.compile("^([^:]+):\\s*(.+?)\\s*\\(Skills?:\\s*(.+?)\\)$");

    @Override
    public List<ProjectIdeaDTO> getProjectIdeas(int studentId) {
        List<SkillSet> skills = skillSetRepo.findByStudent_StudentId(studentId);
        if (skills.isEmpty()) return List.of();

        String prompt = buildProjectPrompt(skills);
        return fetchAndParseProjects(prompt);
    }

    private String buildProjectPrompt(List<SkillSet> skills) {
        StringBuilder sb = new StringBuilder("Generate 5 software project ideas with these specifications:\n");
        sb.append("- Format: 'Project Title: Detailed description (Skills: comma-separated-list)'\n");
        sb.append("- Focus on practical applications\n");
        sb.append("- Combine multiple skills where possible\n");
        sb.append("- Skill Levels:\n");

        skills.forEach(skill -> sb.append(String.format("  %s (Level %d)\n",
                skill.getSkillName(),
                skill.getSkillLevel())));

        return sb.toString();
    }

    private List<ProjectIdeaDTO> fetchAndParseProjects(String prompt) {
        // Retrieve the raw JSON response as a String
        String jsonResponse = webClient.post()
                .uri(geminiApiUrl + "?key=" + geminiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(createRequestBody(prompt))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Extract lines manually from the JSON
        List<String> lines = extractLinesFromJson(jsonResponse);
        return lines.stream()
                .map(this::parseProjectLine)
                .filter(dto -> dto != null)
                .limit(5)
                .collect(Collectors.toList());
    }

    private String createRequestBody(String prompt) {
        return String.format("""
            {
                "contents": [{
                    "parts": [{"text": "%s"}]
                }]
            }
            """, prompt.replace("\"", "\\\""));
    }

    private List<String> extractLinesFromJson(String jsonResponse) {
        ObjectMapper mapper = new ObjectMapper();
        List<String> lines = new ArrayList<>();
        try {
            JsonNode root = mapper.readTree(jsonResponse);
            JsonNode candidates = root.get("candidates");
            if (candidates != null && candidates.isArray()) {
                for (JsonNode candidate : candidates) {
                    // Handle both 'content' and alternative field 'd'
                    JsonNode content = candidate.has("content") ? candidate.get("content") : candidate.get("d");
                    if (content != null) {
                        JsonNode parts = content.get("parts");
                        if (parts != null && parts.isArray()) {
                            for (JsonNode part : parts) {
                                JsonNode textNode = part.get("text");
                                if (textNode != null && textNode.isTextual()) {
                                    String text = textNode.asText();
                                    // Split text by newline in case multiple project lines are returned
                                    lines.addAll(Arrays.asList(text.split("\n")));
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lines;
    }

    private ProjectIdeaDTO parseProjectLine(String line) {
        Matcher matcher = PROJECT_PATTERN.matcher(line.trim());
        if (matcher.find()) {
            return new ProjectIdeaDTO(
                    matcher.group(1).trim(),
                    matcher.group(2).trim(),
                    Arrays.asList(matcher.group(3).split(",\\s*"))
            );
        }
        return null;
    }
}
