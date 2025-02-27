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
    private final StudentJobsRepo studentJobsRepo;
    private final SkillAnalysisService skillAnalysisService;

    private static final String ACTION_1 = " not found. ";
    private final AcademicCourseRepo academicCourseRepo;
    private final CVRepo cvRepo;

    @Override
    @Transactional
    public String saveStudent(StudentSaveRequestDTO studentSaveRequestDTO,UserEntity user) {

        Student student = modelMapper.map(studentSaveRequestDTO,Student.class);
        student.setUser(user);
        CV cv = new CV();
        cv.setStudent(student);
        student.setCv(cv);
        saveJobFields(studentSaveRequestDTO,student);
        saveTechnologies(studentSaveRequestDTO,student);
        saveAcedemicResults(studentSaveRequestDTO,student);
        Student savedStudent = studentRepo.save(student);

        skillAnalysisService.saveSkillsFromAcedemicResults(savedStudent);
        return "Student saved successfully with ID: " + savedStudent.getStudentId();
    }

    public void saveJobFields(StudentSaveRequestDTO dto, Student student) {
        if (dto.getJobFields() != null) {
            List<JobField> newJobFields = new ArrayList<>();
            for (JobFieldDTO jobFieldDto : dto.getJobFields()) {
                JobField jobField = jobFieldRepo.findByJobField(jobFieldDto.getJobField())
                        .orElseThrow(() -> new RuntimeException("JobField not found: " + jobFieldDto.getJobField()));
                newJobFields.add(jobField);
            }
            student.setJobsFields(newJobFields); // Replace the entire list
        }
    }
    public void saveTechnologies(StudentSaveRequestDTO dto, Student student) {
        if (dto.getTechnologies() != null) {
            List<Technology> newTechnologies = new ArrayList<>();
            for (TechnologyDTO techDto : dto.getTechnologies()) {
                Technology tech = technologyRepo.findByTechName(techDto.getTechName())
                        .orElseThrow(() -> new RuntimeException("Technology not found: " + techDto.getTechName()));
                newTechnologies.add(tech);
            }
            student.setTechnologies(newTechnologies); // Replace the entire list
        }
    }
    @Override
    public String updateStudent(StudentUpdateRequestDTO studentUpdateRequestDTO) {
            Student existingStudent = studentRepo.findById(studentUpdateRequestDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student with ID " + studentUpdateRequestDTO.getStudentId() + ACTION_1));

        // Update only allowed fields
            //modelMapper.map(studentUpdateRequestDTO, existingStudent);
            existingStudent.setFirstName(studentUpdateRequestDTO.getFirstName());
            existingStudent.setLastName(studentUpdateRequestDTO.getLastName());
            existingStudent.setEmail(studentUpdateRequestDTO.getEmail());
            existingStudent.setAddress(studentUpdateRequestDTO.getAddress());
            updateJobFields(studentUpdateRequestDTO,existingStudent);
            updateTechnologies(studentUpdateRequestDTO,existingStudent);
            studentRepo.save(existingStudent);
            return "Updated student successfully";


    }

    @Override
    @Transactional
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



    public void updateTechnologies(StudentUpdateRequestDTO dto, Student student) {
        if (dto.getTechnologies() != null) {
            List<Technology> newTechnologies = new ArrayList<>();
            for (TechnologyDTO techDto : dto.getTechnologies()) {
                Technology tech = technologyRepo.findByTechName(techDto.getTechName())
                        .orElseThrow(() -> new RuntimeException("Technology not found: " + techDto.getTechName()));
                newTechnologies.add(tech);
            }
            student.setTechnologies(newTechnologies); // Replace the entire list
        }
    }
    public void updateJobFields(StudentUpdateRequestDTO dto, Student student) {
        if (dto.getJobsFields() != null) {
            List<JobField> newJobFields = new ArrayList<>();
            for (JobFieldDTO jobFieldDto : dto.getJobsFields()) {
                JobField jobField = jobFieldRepo.findByJobField(jobFieldDto.getJobField())
                        .orElseThrow(() -> new RuntimeException("JobField not found: " + jobFieldDto.getJobField()));
                newJobFields.add(jobField);
            }
            student.setJobsFields(newJobFields); // Replace the entire list
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

        if(studentJobsRepo.existsByStudentAndJob(student,job)){
            return "Student "+student.getStudentId()+" already applied for "+job.getJobTitle();
        }
        StudentJobs studentJobs = new StudentJobs();
        studentJobs.setStudent(student);
        studentJobs.setJob(job);
        studentJobsRepo.save(studentJobs);

        return "Student with ID: " + studentId + " applied for job with ID: " + jobId;
    }



    @Override
    public List<ApplyJobResponseDTO> getJobByStudent(@RequestParam int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<StudentJobs> studentJobs = studentJobsRepo.findByStudent(student);
        List<ApplyJobResponseDTO> applyJobResponseDTOS = new ArrayList<>();
        for(StudentJobs studentJobs1 : studentJobs){
            ApplyJobResponseDTO applyJobResponseDTO = new ApplyJobResponseDTO();
            applyJobResponseDTO.setJobId(studentJobs1.getJob().getJobId());
            applyJobResponseDTO.setJobTitle(studentJobs1.getJob().getJobTitle());
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

    @Override
    public StudentgetResponseDTO getStudentByUserId(int userId) {
        Student student = studentRepo.findByUser_Id(userId).orElseThrow(()-> new RuntimeException("Student not found"));
        return modelMapper.map(student,StudentgetResponseDTO.class);

    }

}
