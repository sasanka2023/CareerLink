package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentUpdateRequestDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.repo.JobFieldRepo;
import com.example.CarrerLink_backend.repo.StudentRepo;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
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
    private static final String ACTION_1 = " not found. ";

    @Override
    @Transactional
    public String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO) {

        Student student = modelMapper.map(studentSaveRequestDTO,Student.class);
        saveAcedemicResults(studentSaveRequestDTO,student);
        studentRepo.save(student);
        return "Student saved successfully";
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
}
