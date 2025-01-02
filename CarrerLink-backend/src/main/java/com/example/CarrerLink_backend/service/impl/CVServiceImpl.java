package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.request.CVUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.CVgetResponseDTO;
import com.example.CarrerLink_backend.entity.CV;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.exception.InvalidInputException;
import com.example.CarrerLink_backend.exception.ResourceNotFoundException;
import com.example.CarrerLink_backend.repo.CVRepo;
import com.example.CarrerLink_backend.repo.StudentRepo;
import com.example.CarrerLink_backend.service.CVService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CVServiceImpl implements CVService {

    private final CVRepo cvRepo;
    private final  ModelMapper modelMapper;
    private final StudentRepo studentRepo;

    private static final String ACTION_1 = " does not exist.";

    @Override
    @Transactional
    public String updateCV(int studentId, CVUpdateRequestDTO cvUpdateRequestDTO) {
        CV cv = modelMapper.map(cvUpdateRequestDTO, CV.class);
        if (studentId == 0) {
            throw new InvalidInputException("Student ID is required for an update.");
        }
        if(studentRepo.existsById(studentId) && cvRepo.existsById(cv.getId())){
            cvRepo.save(cv);
            updateSkillSet(cv,studentId);
            return "CV updated successfully";
        }
        else{
            throw new ResourceNotFoundException("CV for student with ID " + studentId + ACTION_1);
        }

    }

    @Override
    public CVgetResponseDTO getCV(int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("CV for student with ID " + studentId + " not found."));

        CV cv = student.getCv();
        return modelMapper.map(cv, CVgetResponseDTO.class);

    }

    public void updateSkillSet(CV cv,int studentId){

    }
}
