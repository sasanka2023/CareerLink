package com.example.CarrerLink_backend.service.impl;


import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.dto.request.ApplyJobRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentSaveRequestDTO;
import com.example.CarrerLink_backend.dto.request.StudentUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.ApplyJobResponseDTO;
import com.example.CarrerLink_backend.dto.response.StudentgetResponseDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.repo.*;
import com.example.CarrerLink_backend.repo.AcademicCourseRepo;
import com.example.CarrerLink_backend.repo.JobFieldRepo;
import com.example.CarrerLink_backend.repo.JobRepo;
import com.example.CarrerLink_backend.repo.StudentRepo;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
import com.example.CarrerLink_backend.service.SkillAnalysisService;
import com.example.CarrerLink_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final ModelMapper modelMapper;
    private final StudentRepo studentRepo;
    private final TechnologyRepo technologyRepo;
    private final JobRepo jobRepo;
    private final JobFieldRepo jobFieldRepo;

    private final SkillAnalysisService skillAnalysisService;

    private static final String ACTION_1 = " not found. ";
    private final AcademicCourseRepo academicCourseRepo;
    private final CVRepo cvRepo;

    @Override
    @Transactional
    public String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO) {

        Student student = modelMapper.map(studentSaveRequestDTO,Student.class);
        CV cv = new CV();
        cv.setStudent(student);
        student.setCv(cv);

        saveAcedemicResults(studentSaveRequestDTO,student);
        Student savedStudent = studentRepo.save(student);

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



    @Override
    public String applyJob(ApplyJobRequestDTO applyJobRequestDTO) {

        int studentId = applyJobRequestDTO.getStudentId();
        int jobId = applyJobRequestDTO.getJobId();

        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        student.getJobs().add(job);

        studentRepo.save(student);

        return "Student with ID: " + studentId + " applied for job with ID: " + jobId;
    }

    @Override
    public List<StudentgetResponseDTO> getAllApplicants(@RequestParam int jobId) {
        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        List<Student> students = job.getStudents();

        List<StudentgetResponseDTO> studentgetResponseDTOS = new ArrayList<>();

        for (Student student : students) {
            StudentgetResponseDTO studentgetResponseDTO = modelMapper.map(student, StudentgetResponseDTO.class);
            studentgetResponseDTOS.add(studentgetResponseDTO);
        }

        return studentgetResponseDTOS;
    }

    @Override
    public List<ApplyJobResponseDTO> getJobByStudent(@RequestParam int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Job> jobs = student.getJobs();

        List<ApplyJobResponseDTO> applyJobResponseDTOS = new ArrayList<>();

        for (Job job : jobs) {
            ApplyJobResponseDTO applyJobResponseDTO = modelMapper.map(job, ApplyJobResponseDTO.class);
            applyJobResponseDTOS.add(applyJobResponseDTO);
        }

        return applyJobResponseDTOS;
    }

    @Override
    public StudentgetResponseDTO getStudentById(int stId) {
        Student student = studentRepo.findById(stId).orElseThrow(()->new RuntimeException("Student not found"));
        return modelMapper.map(student, StudentgetResponseDTO.class);
    }

    @Override
    public StudentgetResponseDTO getStudentByUserName(String userName) {
        Student student = studentRepo.findByUserName(userName).orElseThrow(()-> new RuntimeException("Student not found"));
        return modelMapper.map(student,StudentgetResponseDTO.class);
    }

}
