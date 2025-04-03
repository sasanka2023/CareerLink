package com.example.CarrerLink_backend.utill;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ImageUploadGenerator {
    public String generateResourceName(String fileName, String type) {
        StringBuilder builder = new StringBuilder();
        builder.append(UUID.randomUUID().toString());
        builder.append("_CareerLink_");
        builder.append(type).append("_");
        builder.append(fileName);
        return builder.toString();
    }
}
