package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentUpdateRequestDTO;

public interface StudentService {
    String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO);

    String updateStudent(StudentUpdateRequestDTO studentUpdateRequestDTO);

    void deleteStudent(int id);
}
