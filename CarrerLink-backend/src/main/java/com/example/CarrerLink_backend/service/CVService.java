package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.CVUpdateRequestDTO;
import com.example.CarrerLink_backend.entity.CV;

public interface CVService {
    String updateCV(int studentId, CVUpdateRequestDTO cvUpdateRequestDTO);
}
