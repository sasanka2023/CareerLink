package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.dto.*;
import com.example.CarrerLink_backend.dto.request.CVUpdateRequestDTO;
import com.example.CarrerLink_backend.dto.response.CVgetResponseDTO;
import com.example.CarrerLink_backend.entity.*;
import com.example.CarrerLink_backend.exception.InvalidInputException;
import com.example.CarrerLink_backend.exception.ResourceNotFoundException;
import com.example.CarrerLink_backend.repo.CVRepo;
import com.example.CarrerLink_backend.repo.StudentRepo;
import com.example.CarrerLink_backend.service.CVService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CVServiceImpl implements CVService {

    private final CVRepo cvRepo;
    private final  ModelMapper modelMapper;
    private final StudentRepo studentRepo;
    private final CountBroadcastService broadcastService;
    private static final String ACTION_1 = " does not exist.";

    @Override
    @Transactional
    public String updateCV(int studentId, CVUpdateRequestDTO cvUpdateRequestDTO) {
//
        if (studentId == 0) {
            throw new InvalidInputException("Student ID is required for an update.");
        }
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));
        CV existingCV = student.getCv();
        if (existingCV == null) {
            throw new ResourceNotFoundException("CV not found for student ID: " + studentId);
        }
        existingCV.setName(cvUpdateRequestDTO.getName());
        existingCV.setTitle(cvUpdateRequestDTO.getTitle());
        existingCV.setMobile(cvUpdateRequestDTO.getMobile());
        existingCV.setAddress(cvUpdateRequestDTO.getAddress());
        existingCV.setEmail(cvUpdateRequestDTO.getEmail());
        existingCV.setGithubLink(cvUpdateRequestDTO.getGithubLink());
        existingCV.setLinkedinLink(cvUpdateRequestDTO.getLinkedinLink());

        existingCV.setSummary(cvUpdateRequestDTO.getSummary());
        existingCV.setExperience(cvUpdateRequestDTO.getExperience());
        existingCV.setAdditionalInfo(cvUpdateRequestDTO.getAdditionalInfo());

        existingCV.setBio(cvUpdateRequestDTO.getBio());
        existingCV.setReferee(cvUpdateRequestDTO.getReferee());
        existingCV.setRefereeEmail(cvUpdateRequestDTO.getRefereeEmail());

        // Process Technical Skills


        List<TechnicalSkills> technicalSkills = new ArrayList<>();
        for (TechnicalSkillDTO techDto : cvUpdateRequestDTO.getSkills()) {
            TechnicalSkills tech = new TechnicalSkills();
            tech.setTechSkill(techDto.getTechSkill());
            tech.setCategory(techDto.getCategory());
            tech.setCv(existingCV);
            technicalSkills.add(tech);
        }
        existingCV.setSkills(technicalSkills); // Replace the entire list
// Process Projects
        List<Projects> projects = new ArrayList<>();
        for (ProjectsDTO projectDTO : cvUpdateRequestDTO.getProjects()) {
            Projects project = new Projects();
            project.setProjectName(projectDTO.getProjectName());
            project.setProjectDescription(projectDTO.getProjectDescription());
            project.setGithubLink(projectDTO.getGithubLink());
            project.setCv(existingCV);
            projects.add(project);
        }
        existingCV.setProjects(projects); // Replace the entire list

// Process Experiences
        List<Experience> experiences = new ArrayList<>();
        for (ExperienceDTO expDTO : cvUpdateRequestDTO.getExperiences()) {
            Experience experience = new Experience();
            experience.setJobTitle(expDTO.getJobTitle());
            experience.setCompanyName(expDTO.getCompanyName());
            experience.setStartDate(expDTO.getStartDate());
            experience.setEndDate(expDTO.getEndDate());
            experience.setDescription(expDTO.getDescription());
            experience.setCv(existingCV);
            experiences.add(experience);
        }
        existingCV.setExperiences(experiences); // Replace the entire list

// Process Educations
        List<Education> educations = new ArrayList<>();
        for (EducationDTO eduDTO : cvUpdateRequestDTO.getEducations()) {
            Education education = new Education();
            education.setDegree(eduDTO.getDegree());
            education.setInstitution(eduDTO.getInstitution());
            education.setLocation(eduDTO.getLocation());
            education.setStartDate(eduDTO.getStartDate());
            education.setEndDate(eduDTO.getEndDate());
            education.setGpa(eduDTO.getGpa());
            education.setDescription(eduDTO.getDescription());
            education.setCv(existingCV);
            educations.add(education);
        }
        existingCV.setEducations(educations); // Replace the entire list

// Process Certifications
        List<Certification> certifications = new ArrayList<>();
        for (CertificationDTO certDTO : cvUpdateRequestDTO.getCertifications()) {
            Certification certification = new Certification();
            certification.setName(certDTO.getName());
            certification.setOrganization(certDTO.getOrganization());
            certification.setIssueDate(certDTO.getIssueDate());
            certification.setCertificationLink(certDTO.getCertificationLink());
            certification.setCv(existingCV);
            certifications.add(certification);
        }
        existingCV.setCertifications(certifications);
        broadcastService.broadcastCounts();// Replace the entire list   cvRepo.save(existingCV);
        return "CV updated successfully";

    }

    @Override
    public CVgetResponseDTO getCV(int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("CV for student with ID " + studentId + " not found."));

        CV cv = student.getCv();
        return modelMapper.map(cv, CVgetResponseDTO.class);

    }

    public void updateSkillSet(CV cv,int studentId){

    }

    private void clearCollections(CV cv) {
        cv.getSkills().clear();
        cv.getProjects().clear();
        cv.getExperiences().clear();
        cv.getEducations().clear();
        cv.getCertifications().clear();
    }
}
