package com.example.CarrerLink_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

        // Extract text from first candidate's content parts
        return candidates.stream()
                .flatMap(candidate -> candidate.getContent().getParts().stream())
                .map(Part::getText)
                .flatMap(text -> List.of(text.split("\n")).stream()) // Split into list
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .collect(Collectors.toList());
    }
}

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class Candidate {
    private Content content;
}

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class Content {
    private List<Part> parts;
}

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class Part {
    private String text;
}
