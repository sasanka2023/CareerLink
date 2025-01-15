package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.AcedemicResultsDTO;
import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.repo.*;
import com.example.CarrerLink_backend.service.SkillAnalysisService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

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

    @Test
    public void should_successfully_save_a_student() {
        // Arrange
        List<AcedemicResultsDTO> acedemicResultsDTO = List.of(
                new AcedemicResultsDTO(1, "maths", "A"),
                new AcedemicResultsDTO(2, "science", "B")
        );

        StudentSaveRequestDTO studentSaveRequestDTO = new StudentSaveRequestDTO(
                1,
                "sasanka",
                "gayathra",
                "sasankagayathra@gmail.com",
                "sasa123",
                "ahangama",
                "zibra",
                acedemicResultsDTO,
                "Ruhuna",
                "CS",
                "bcs"
        );

        Student student = new Student();
        student.setStudentId(1);
        student.setFirstName("sasanka");
        student.setLastName("gayathra");
        student.setAcedemicResults(new ArrayList<>());

        CV cv = new CV();
        cv.setId(1);
        cv.setStudent(student);

        // Mock external calls
        when(modelMapper.map(studentSaveRequestDTO, Student.class)).thenReturn(student);
        when(studentRepo.save(student)).thenReturn(student);
        when(cvRepo.save(any(CV.class))).thenReturn(cv);
        doNothing().when(skillAnalysisService).saveSkillsFromAcedemicResults(student);
        // Act
        String result = studentService.saveStudent(studentSaveRequestDTO);

        // Assert
        assertEquals("Student saved successfully with ID: 1", result);
        verify(studentRepo, times(1)).save(student); // Ensure student was saved twice
        verify(cvRepo, times(1)).save(cv); // Ensure CV was saved once
    }
}
