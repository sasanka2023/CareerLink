package com.example.CarrerLink_backend.dto.response;

import java.util.List;

public class GeminiResponse {
    private List<Candidate> candidates;

    public List<String> getTextResults() {
        if (candidates == null || candidates.isEmpty()) {
            return List.of("No recommendations found.");
        }
        return candidates.stream()
                .map(candidate -> candidate.getContent().getParts().get(0).getText())
                .toList();
    }

    // Inner classes to match JSON response
    private static class Candidate {
        private Content content;

        public Content getContent() {
            return content;
        }
    }

    private static class Content {
        private List<Part> parts;

        public List<Part> getParts() {
            return parts;
        }
    }

    private static class Part {
        private String text;

        public String getText() {
            return text;
        }
    }
}
