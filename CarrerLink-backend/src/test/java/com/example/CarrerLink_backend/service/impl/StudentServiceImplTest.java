package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.*;
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
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.List;
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
    private SkillAnalysisService skillAnalysisService;

    @InjectMocks
    private StudentServiceImpl studentService;



    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);

    }

    @Test
    public void should_Map_Student_Dto_To_Student(){
        ModelMapper modelMapper1 = new ModelMapper();

        List<JobFieldDTO> jobFields = new ArrayList<>();
        List<TechnologyDTO> technologies = new ArrayList<>();
        List<SkillSetDTO> skillSets = new ArrayList<>();
        List<AcedemicResultsDTO> acedemicResultsDTOS = new ArrayList<>();
        List<ReviewDTO> reviewDTOS = new ArrayList<>();
        List<ProjectsDTO> projectsDTOS = new ArrayList<>();
        StudentgetResponseDTO studentgetResponseDTO = new StudentgetResponseDTO(
                1,"sasanka","gayathra","sasa@gmail.com",
                "sasa123","ahangama/galle","sasa",jobFields,skillSets,technologies,acedemicResultsDTOS,"Ruhuna","Computer Science","BCS",reviewDTOS,projectsDTOS
        );

        Student student = modelMapper1.map(studentgetResponseDTO,Student.class);
        assertEquals(studentgetResponseDTO.getFirstName(),student.getFirstName());


    }


    @Test
    public void should_successfully_save_a_student() {
//        // Arrange
//        List<AcedemicResultsDTO> acedemicResultsDTO = List.of(
//                new AcedemicResultsDTO(1, "maths", "A"),
//                new AcedemicResultsDTO(2, "science", "B")
//        );
//
//        StudentSaveRequestDTO studentSaveRequestDTO = new StudentSaveRequestDTO(
//                1,
//                "sasanka",
//                "gayathra",
//                "sasankagayathra@gmail.com",
//                "sasa123",
//                "ahangama",
//                "zibra",
//                acedemicResultsDTO,
//                "Ruhuna",
//                "CS",
//                "bcs"
//        );
//
//        Student student = new Student();
//        student.setStudentId(1);
//        student.setFirstName("sasanka");
//        student.setLastName("gayathra");
//        student.setAcedemicResults(new ArrayList<>());
//        student.setCv(new CV());
//
//
//
//        // Mock external calls
//        when(modelMapper.map(studentSaveRequestDTO, Student.class)).thenReturn(student);
//        when(studentRepo.save(student)).thenReturn(student);
//        doNothing().when(skillAnalysisService).saveSkillsFromAcedemicResults(student);
//        // Act
//        String result = studentService.saveStudent(studentSaveRequestDTO);
//
//        // Assert
//        assertEquals("Student saved successfully with ID: 1", result);
//        verify(studentRepo, times(1)).save(student); // Ensure student was saved twice
        // Arrange
        Student student = new Student();
        student.setStudentId(1); // Mock student id
        CV cv = new CV();
        cv.setStudent(student);
        student.setCv(cv);
        StudentSaveRequestDTO studentSaveRequestDTO = new StudentSaveRequestDTO();
        // Mocking the behavior of dependencies
        when(modelMapper.map(studentSaveRequestDTO, Student.class)).thenReturn(student);
        when(studentRepo.save(student)).thenReturn(student);

        // Act
        String result = studentService.saveStudent(studentSaveRequestDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Student saved successfully with ID: 1", result);

        // Verify that save was called on the repository
        verify(studentRepo, times(1)).save(student);

        // Verify that saveSkillsFromAcedemicResults was called
        verify(skillAnalysisService, times(1)).saveSkillsFromAcedemicResults(student);


    }

    @Test
    void should_throw_exception_when_student_not_found() {
        // Arrange
        int studentId = 99;
        StudentUpdateRequestDTO updateRequest = new StudentUpdateRequestDTO();
        updateRequest.setStudentId(studentId);

        when(studentRepo.findById(studentId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            studentService.updateStudent(updateRequest);
        });

        assertEquals("Student with ID 99 not found. ", exception.getMessage());

        // Verify that save was never called
        verify(studentRepo, never()).save(any(Student.class));
    }

    @Test
    void should_successfully_update_a_student() {
        // Arrange - Prepare test data
        StudentUpdateRequestDTO studentupdateDTO = new StudentUpdateRequestDTO(
                5, "sasa", "gayathra", "sasa@gmail.com", "Ahangama/Galle", "sasa1", null, null
        );

        Student existingStudent = new Student();
        existingStudent.setStudentId(5);
        existingStudent.setFirstName("sasanka");
        existingStudent.setLastName("gayathra");
        existingStudent.setEmail("sasanka@gmail.com");
        existingStudent.setUserName("zibra");
        existingStudent.setJobsFields(null);
        existingStudent.setTechnologies(null);

        // Mock dependencies
        when(studentRepo.findById(studentupdateDTO.getStudentId())).thenReturn(Optional.of(existingStudent));
        when(studentRepo.save(existingStudent)).thenReturn(existingStudent); // Save existing student

        // Act
        String result = studentService.updateStudent(studentupdateDTO);

        // Assert
        assertEquals("Updated student successfully", result);
        assertEquals("sasa", existingStudent.getFirstName());
        assertEquals("gayathra", existingStudent.getLastName());
        assertEquals("sasa@gmail.com", existingStudent.getEmail());
        assertEquals("sasa1", existingStudent.getUserName());

        // Verify interactions
        verify(studentRepo, times(1)).findById(existingStudent.getStudentId());
        verify(studentRepo, times(1)).save(existingStudent);
    }

}
