package com.example.CarrerLink_backend.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponseDTO {
    private String token;
    private LocalDateTime time;
    private String error;
    private String message;
}
