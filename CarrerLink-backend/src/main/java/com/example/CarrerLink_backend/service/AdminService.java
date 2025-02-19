package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.JobFieldDTO;
import com.example.CarrerLink_backend.dto.TechnologyDTO;

public interface AdminService {
    void saveTechnology(TechnologyDTO technologyDTO);
    void saveJobField(JobFieldDTO jobFieldDTO);
    TechnologyDTO getTechnology(int id);
    TechnologyDTO updateTechnology(int id,TechnologyDTO technologyDTO);
    void deleteTechnology(int id);
}
