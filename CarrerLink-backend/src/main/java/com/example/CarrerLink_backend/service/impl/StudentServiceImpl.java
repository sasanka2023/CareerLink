package com.example.CarrerLink_backend.service.impl;


import com.amazonaws.services.s3.AmazonS3;
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
import com.example.CarrerLink_backend.utill.CommonFileSaveBinaryDataDto;
import com.example.CarrerLink_backend.utill.FileExtractor;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;
    private final ModelMapper modelMapper;
    private final StudentRepo studentRepo;
    private final TechnologyRepo technologyRepo;
    private final JobRepo jobRepo;
    private final JobFieldRepo jobFieldRepo;
    private final StudentJobsRepo studentJobsRepo;
    private final SkillAnalysisService skillAnalysisService;
private final AmazonS3 amazonS3;
    private static final String ACTION_1 = " not found. ";
    private final AcademicCourseRepo academicCourseRepo;
    private final CVRepo cvRepo;
    private final FileExtractor fileExtractor;


    private final FileServiceImpl fileService;
    private final ProfileImageRepo profileImageRepo;

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
    public String updateStudent(StudentUpdateRequestDTO studentUpdateRequestDTO, MultipartFile imageFile) {
        try {
            // Fetch the student entity using student ID
            Student existingStudent = studentRepo.findById(studentUpdateRequestDTO.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student with ID " + studentUpdateRequestDTO.getStudentId() + " not found"));

            // Retrieve the User ID associated with this Student
            int userId = existingStudent.getUser().getId();

            // Update student details
            existingStudent.setFirstName(studentUpdateRequestDTO.getFirstName());
            existingStudent.setLastName(studentUpdateRequestDTO.getLastName());
            existingStudent.setEmail(studentUpdateRequestDTO.getEmail());
            existingStudent.setAddress(studentUpdateRequestDTO.getAddress());

            updateJobFields(studentUpdateRequestDTO, existingStudent);
            updateTechnologies(studentUpdateRequestDTO, existingStudent);

            // If an image file is provided, save it using the mapped User ID
            if (imageFile != null && !imageFile.isEmpty()) {
                String profilePicUrl = saveImgFile(userId, imageFile); // Save image and get the URL

                // Update profilePicUrl in Student table
                existingStudent.setProfilePicUrl(profilePicUrl);

            }

            studentRepo.save(existingStudent);
            return existingStudent.getProfilePicUrl();

        } catch (IOException e) {
            throw new RuntimeException("Error updating student: " + e.getMessage(), e);
        }
    }





    public String saveImgFile(int id, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty or null");
        }

        // Fetch student
        Student student = studentRepo.findByUser_Id(id)
                .orElseThrow(() -> new RuntimeException("Student not found for ID: " + id));

        // Fetch existing profile image if available
        ProfileImage profileImage = profileImageRepo.findByUserId(student.getUser().getId())
                .orElse(null);

        // Delete existing image from S3 if it exists
        if (profileImage != null && profileImage.getUrl() != null) {
            String oldImageKey = profileImage.getUrl().substring(profileImage.getUrl().lastIndexOf("/") + 1);
            amazonS3.deleteObject(bucketName, "profile_image/" + oldImageKey);
        }

        // Upload new image to S3
        CommonFileSaveBinaryDataDto resource = fileService.createResource(file, "profile_image/", bucketName);

        // Update profile image record
        if (profileImage == null) {
            profileImage = new ProfileImage();
            profileImage.setId(UUID.randomUUID().toString());
        }

        profileImage.setUrl(resource.getUrl()); // Store only the new URL
        profileImage.setFileName(file.getOriginalFilename());
        profileImage.setUser(student.getUser());

        profileImageRepo.save(profileImage);

        return profileImage.getUrl();
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
        // Fetch student by user ID
        Student student = studentRepo.findByUser_Id(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Map the student entity to the response DTO
        StudentgetResponseDTO responseDTO = modelMapper.map(student, StudentgetResponseDTO.class);

        Optional<String> profileImageUrl = getUrlByUserId(userId);

        // Set the profile image URL in the response DTO (fallback to default if not found)
        responseDTO.setProfileImageUrl(profileImageUrl.orElse("default-image-url")); // R

        return responseDTO;
    }

    public Optional<String> getUrlByUserId(int userId){
        return profileImageRepo.findUrlByUserId(userId);
    }




}
