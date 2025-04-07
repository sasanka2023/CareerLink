package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.request.ApplyJobRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.ApplyJobResponseDTO;
import com.example.CarrerLink_backend.dto.response.StudentgetResponseDTO;
import com.example.CarrerLink_backend.entity.UserEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO, UserEntity user);



    String updateStudent(StudentUpdateRequestDTO studentUpdateRequestDTO, MultipartFile imageFile);



    void deleteStudent(int id);

    String applyJob(ApplyJobRequestDTO applyJobRequestDTO);



    List<ApplyJobResponseDTO> getJobByStudent(int studentId);



    StudentgetResponseDTO getStudentById(int stId);

    StudentgetResponseDTO getStudentByUserName(String userName);

    StudentgetResponseDTO getStudentByUserId(int userId);



    String approveStudent(int studentId);

    List<StudentgetResponseDTO> getAllStudents();
}
