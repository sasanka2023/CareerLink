package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.request.CVUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.CVgetResponseDTO;

public interface CVService {
    String updateCV(int studentId, CVUpdateRequestDTO cvUpdateRequestDTO);

    CVgetResponseDTO getCV(int studentId);
}
