package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentUpdateRequestDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.repo.*;
import com.example.CarrerLink_backend.service.SkillAnalysisService;
import com.example.CarrerLink_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final ModelMapper modelMapper;
    private final StudentRepo studentRepo;
    private final TechnologyRepo technologyRepo;
    private final JobFieldRepo jobFieldRepo;
    private final SkillAnalysisService skillAnalysisService;
    private static final String ACTION_1 = " not found. ";
    private final AcademicCourseRepo academicCourseRepo;
    private final CVRepo cvRepo;

    @Override
    @Transactional
    public String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO) {

        Student student = modelMapper.map(studentSaveRequestDTO,Student.class);
        Student savedStudent = studentRepo.save(student);
        saveAcedemicResults(studentSaveRequestDTO,savedStudent);

        CV cv = new CV();
        cv.setStudent(savedStudent);
        CV savedCV = cvRepo.save(cv); // Save the CV explicitly
        savedStudent.setCv(cv);

        studentRepo.save(savedStudent);
        skillAnalysisService.saveSkillsFromAcedemicResults(savedStudent);
        return "Student saved successfully with ID: " + savedStudent.getStudentId();
    }

    @Override
    public String updateStudent(StudentUpdateRequestDTO studentUpdateRequestDTO) {
        if(studentRepo.existsById(studentUpdateRequestDTO.getStudentId())){
            Student student = modelMapper.map(studentUpdateRequestDTO,Student.class);
            updateJobFields(studentUpdateRequestDTO,student);
            updateTechnologies(studentUpdateRequestDTO,student);
            studentRepo.save(student);
            return "Updated student successfully";
        }
        else{
            throw new RuntimeException("Company with ID " + studentUpdateRequestDTO.getStudentId() + ACTION_1);
        }
    }

    @Override
    public void deleteStudent(int id) {
        if(!studentRepo.existsById(id)){
            throw new RuntimeException("student with ID " + id + ACTION_1);
        }
        studentRepo.deleteById(id);
    }


    public void saveAcedemicResults(StudentSaveRequestDTO studentSaveRequestDTO, Student student){
        if (studentSaveRequestDTO.getAcedemicResults() != null) {
            for (AcedemicResults acedemicResults : student.getAcedemicResults()) {
                acedemicResults.setStudents(student);

            }
        }
    }



    public void updateTechnologies(StudentUpdateRequestDTO studentUpdateRequestDTO, Student student){
        if (studentUpdateRequestDTO.getTechnologies() != null) {
            List<Technology> technologies = new ArrayList<>();
            for (TechnologyDTO mappedTechnology : studentUpdateRequestDTO.getTechnologies()) {
                Technology technology = technologyRepo.findByTechName(mappedTechnology.getTechName())
                        .orElseThrow(() -> new RuntimeException("Technology with name " + mappedTechnology.getTechName() + ACTION_1));
                technologies.add(technology);
            }
            student.setTechnologies(technologies);
        }
    }
    public void updateJobFields(StudentUpdateRequestDTO studentUpdateRequestDTO, Student student){
        if (studentUpdateRequestDTO.getJobsFields() != null) {
            List<JobField> jobFields = new ArrayList<>();
            for (JobFieldDTO mappedjobfield : studentUpdateRequestDTO.getJobsFields()) {
                JobField jobField = jobFieldRepo.findByJobField(mappedjobfield.getJobField())
                        .orElseThrow(() -> new RuntimeException("Technology with name " + mappedjobfield.getJobField()+ ACTION_1));
                jobFields.add(jobField);
            }
            student.setJobsFields(jobFields);
        }
    }

   /* public void setTechnologiesForCv(CV cv,Student student){
        List<String> techs = new ArrayList<>();
        for(Technology technology : student.getTechnologies()){
            techs.add(technology.getTechName());
        }

    }*/
}
