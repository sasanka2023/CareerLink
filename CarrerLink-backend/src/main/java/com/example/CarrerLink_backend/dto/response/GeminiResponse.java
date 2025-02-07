package com.example.CarrerLink_backend.dto.response;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeminiResponse {
    private List<Candidate> candidates;

    public List<RecommendedCoursesDTO> extractCourseList() {
        List<RecommendedCoursesDTO> courses = new ArrayList<>();
        if (candidates == null) return courses;

        for (Candidate candidate : candidates) {
            for (Part part : candidate.getContent().getParts()) {
                String text = part.getText();
                if (text != null) {
                    courses.addAll(parseCourses(text));
                }
            }
        }
        return courses;
    }

    private List<RecommendedCoursesDTO> parseCourses(String responseText) {
        List<RecommendedCoursesDTO> courses = new ArrayList<>();
        Pattern pattern = Pattern.compile("(.+?)\\s+-\\s+(https?://\\S+)"); // Regex to match "Name - URL"

        for (String line : responseText.split("\n")) {
            Matcher matcher = pattern.matcher(line.trim());
            if (matcher.matches()) {
                courses.add(new RecommendedCoursesDTO(
                        matcher.group(1).trim(),
                        matcher.group(2).trim()
                ));
            }
        }
        return courses;
    }
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Candidate {
    private Content content;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Content {
    private List<Part> parts;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Part {
    private String text;
}
