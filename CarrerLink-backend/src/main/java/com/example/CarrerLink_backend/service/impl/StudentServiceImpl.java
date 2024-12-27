package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.dto.JobgetResponseDTO;
import com.example.CarrerLink_backend.dto.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.entity.Job;
import com.example.CarrerLink_backend.entity.Student;
import com.example.CarrerLink_backend.repo.StudentRepo;
import com.example.CarrerLink_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final ModelMapper modelMapper;
    private final StudentRepo studentRepo;

    @Override
    public String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO) {

        Student student = modelMapper.map(studentSaveRequestDTO,Student.class);

        studentRepo.save(student);
        return "Student saved successfully";
    }

    public void saveorUpdateJobs(StudentSaveRequestDTO studentSaveRequestDTO,Student student){
        if(studentSaveRequestDTO.getJobs() != null){
            List<Job> jobs = new ArrayList<>();
            for(JobgetResponseDTO)
        }
    }
}
