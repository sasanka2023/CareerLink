package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.request.ApplyJobRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.ApplyJobResponseDTO;
import com.example.CarrerLink_backend.dto.response.StudentgetResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;

import java.util.List;

public interface StudentService {
    String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO, UserEntity user);

    String updateStudent(StudentUpdateRequestDTO studentUpdateRequestDTO);

    void deleteStudent(int id);

    String applyJob(ApplyJobRequestDTO applyJobRequestDTO);



    List<ApplyJobResponseDTO> getJobByStudent(int studentId);



    StudentgetResponseDTO getStudentById(int stId);

    StudentgetResponseDTO getStudentByUserName(String userName);

    StudentgetResponseDTO getStudentByUserId(int userId);
}
