package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.dto.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.StudentUpdateRequestDTO;

public interface StudentService {
    String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO);

    String updateStudent(StudentUpdateRequestDTO studentUpdateRequestDTO);

    void deleteStudent(int id);
}
