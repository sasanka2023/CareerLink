package com.example.CarrerLink_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GeminiResponse {
    private List<Candidate> candidates;

    public List<String> extractCourseList() {
        if (candidates == null || candidates.isEmpty()) {
            return List.of("No courses found.");
        }

        return candidates.stream()
                .flatMap(candidate -> candidate.getContent().getParts().stream())
                .map(Part::getText)
                .flatMap(text -> Arrays.stream(text.split("\n"))) // More efficient splitting
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .collect(Collectors.toList());
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Candidate {
        private Content content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Content {
        private List<Part> parts;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Part {
        private String text;
    }
}