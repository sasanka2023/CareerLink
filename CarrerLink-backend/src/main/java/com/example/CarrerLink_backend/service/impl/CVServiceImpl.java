package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.CVUpdateRequestDTO;
import com.example.CarrerLink_backend.entity.CV;
import com.example.CarrerLink_backend.exception.InvalidInputException;
import com.example.CarrerLink_backend.exception.ResourceNotFoundException;
import com.example.CarrerLink_backend.repo.CVRepo;
import com.example.CarrerLink_backend.service.CVService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CVServiceImpl implements CVService {

    @Autowired
    private CVRepo cvRepo;

    @Autowired
    private ModelMapper modelMapper;

    private static final String ACTION_1 = " does not exist.";

    @Override
    @Transactional
    public String updateCV(int studentId, CVUpdateRequestDTO cvUpdateRequestDTO) {
        if (studentId == 0) {
            throw new InvalidInputException("Student ID is required for an update.");
        }
//        if (!cvRepo.existsByStudentId(studentId)) {
//            throw new ResourceNotFoundException("CV for student with ID " + studentId + ACTION_1);
//        }
        CV cv = modelMapper.map(cvUpdateRequestDTO, CV.class);
        //cv.setStudentId(studentId);
        cvRepo.save(cv);

        return "CV updated successfully";
    }
}
