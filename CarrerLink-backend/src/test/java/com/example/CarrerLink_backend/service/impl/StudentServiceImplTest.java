package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.StudentgetResponseDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.repo.*;
import com.example.CarrerLink_backend.service.SkillAnalysisService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceImplTest {

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private StudentRepo studentRepo;

    @Mock
    private CVRepo cvRepo;

    @Mock
    private TechnologyRepo technologyRepo;

    @Mock
    private JobFieldRepo jobFieldRepo;

    @Mock
    private SkillAnalysisService skillAnalysisService;

    @InjectMocks
    private StudentServiceImpl studentService;

    private Student student;
    private StudentSaveRequestDTO studentSaveRequestDTO;
    private StudentUpdateRequestDTO studentUpdateRequestDTO;
    private MultipartFile imageFile;

    @BeforeEach
    void setUp() {
        student = new Student(studentId);
        student.setStudentId(1);
        student.setFirstName("sasanka");
        student.setLastName("gayathra");
        student.setEmail("sasanka@gmail.com");
        student.setAddress("Ahangama/Galle");


        studentSaveRequestDTO = new StudentSaveRequestDTO();
        studentSaveRequestDTO.setFirstName("sasanka");
        studentSaveRequestDTO.setLastName("gayathra");
        studentSaveRequestDTO.setEmail("sasanka@gmail.com");
        studentSaveRequestDTO.setAddress("Ahangama/Galle");


        studentUpdateRequestDTO = new StudentUpdateRequestDTO();
        studentUpdateRequestDTO.setStudentId(1);
        studentUpdateRequestDTO.setFirstName("sasa");
        studentUpdateRequestDTO.setLastName("gayathra");
        studentUpdateRequestDTO.setEmail("sasa@gmail.com");
        studentUpdateRequestDTO.setAddress("Ahangama/Galle");


    }

    @Test
    void should_successfully_save_a_student() {
        // Arrange
        when(modelMapper.map(studentSaveRequestDTO, Student.class)).thenReturn(student);
        when(studentRepo.save(student)).thenReturn(student);

        // Act
        String result = studentService.saveStudent(studentSaveRequestDTO, new UserEntity());

        // Assert
        assertEquals("Student saved successfully with ID: 1", result);
        verify(studentRepo, times(1)).save(student);
        verify(skillAnalysisService, times(1)).saveSkillsFromAcedemicResults(student);
    }

    @Test
    void should_throw_exception_when_student_not_found() {
        // Arrange
        int studentId = 99;
        when(studentRepo.findById(studentId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            studentService.updateStudent(studentUpdateRequestDTO,imageFile);
        });

        assertEquals("Student with ID 99 not found. ", exception.getMessage());
        verify(studentRepo, never()).save(any(Student.class));
    }

    @Test
    void should_successfully_update_a_student() {
        // Arrange
        when(studentRepo.findById(studentUpdateRequestDTO.getStudentId())).thenReturn(Optional.of(student));
        when(studentRepo.save(student)).thenReturn(student);

        // Act
        String result = studentService.updateStudent(studentUpdateRequestDTO,imageFile);

        // Assert
        assertEquals("Updated student successfully", result);
        assertEquals("sasa", student.getFirstName());
        assertEquals("gayathra", student.getLastName());
        assertEquals("sasa@gmail.com", student.getEmail());
        verify(studentRepo, times(1)).findById(student.getStudentId());
        verify(studentRepo, times(1)).save(student);
    }

    @Test
    void should_delete_student_successfully() {
        // Arrange
        int studentId = 1;
        when(studentRepo.existsById(studentId)).thenReturn(true);

        // Act
        studentService.deleteStudent(studentId);

        // Assert
        verify(studentRepo, times(1)).deleteById(studentId);
    }

    @Test
    void should_throw_exception_when_deleting_non_existent_student() {
        // Arrange
        int studentId = 99;
        when(studentRepo.existsById(studentId)).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            studentService.deleteStudent(studentId);
        });

        assertEquals("student with ID 99 not found. ", exception.getMessage());
        verify(studentRepo, never()).deleteById(studentId);
    }

    @Test
    void should_get_student_by_id_successfully() {
        // Arrange
        int studentId = 1;
        when(studentRepo.findById(studentId)).thenReturn(Optional.of(student));
        when(modelMapper.map(student, StudentgetResponseDTO.class)).thenReturn(new StudentgetResponseDTO());

        // Act
        StudentgetResponseDTO result = studentService.getStudentById(studentId);

        // Assert
        assertNotNull(result);
        verify(studentRepo, times(1)).findById(studentId);
    }

    @Test
    void should_throw_exception_when_student_not_found_by_id() {
        // Arrange
        int studentId = 99;
        when(studentRepo.findById(studentId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            studentService.getStudentById(studentId);
        });

        assertEquals("Student not found", exception.getMessage());
    }

    @Test
    void should_get_student_by_user_name_successfully() {
        // Arrange
        String userName = "sasa1";
        when(studentRepo.findByUserName(userName)).thenReturn(Optional.of(student));
        when(modelMapper.map(student, StudentgetResponseDTO.class)).thenReturn(new StudentgetResponseDTO());

        // Act
        StudentgetResponseDTO result = studentService.getStudentByUserName(userName);

        // Assert
        assertNotNull(result);
        verify(studentRepo, times(1)).findByUserName(userName);
    }

    @Test
    void should_throw_exception_when_student_not_found_by_user_name() {
        // Arrange
        String userName = "unknown";
        when(studentRepo.findByUserName(userName)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            studentService.getStudentByUserName(userName);
        });

        assertEquals("Student not found", exception.getMessage());
    }

    @Test
    void should_get_student_by_user_id_successfully() {
        // Arrange
        int userId = 1;
        when(studentRepo.findByUser_Id(userId)).thenReturn(Optional.of(student));
        when(modelMapper.map(student, StudentgetResponseDTO.class)).thenReturn(new StudentgetResponseDTO());

        // Act
        StudentgetResponseDTO result = studentService.getStudentByUserId(userId);

        // Assert
        assertNotNull(result);
        verify(studentRepo, times(1)).findByUser_Id(userId);
    }

    @Test
    void should_throw_exception_when_student_not_found_by_user_id() {
        // Arrange
        int userId = 99;
        when(studentRepo.findByUser_Id(userId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            studentService.getStudentByUserId(userId);
        });

        assertEquals("Student not found", exception.getMessage());
    }
}