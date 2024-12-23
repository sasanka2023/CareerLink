package com.example.CarrerLink_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewDTO {
    private int reviewId;

    private String reviewerName;

    private String review;
}
