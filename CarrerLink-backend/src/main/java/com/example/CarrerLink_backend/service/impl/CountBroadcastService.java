package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.repo.CVRepo;
import com.example.CarrerLink_backend.repo.JobFieldRepo;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
import com.example.CarrerLink_backend.repo.TestRepository;
import com.example.CarrerLink_backend.service.AdminService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
@Service
public class CountBroadcastService {
    private final SimpMessagingTemplate messagingTemplate;
    private final TechnologyRepo technologyRepository;
    private final JobFieldRepo jobFieldRepository;
    private final AdminService adminService;
    private final CVRepo cvRepo;
    private final TestRepository testRepository;
    public CountBroadcastService(SimpMessagingTemplate messagingTemplate,
                                 TechnologyRepo technologyRepository,
                                 JobFieldRepo jobFieldRepository, AdminService adminService,CVRepo cvRepo,TestRepository testRepository) {
        this.messagingTemplate = messagingTemplate;
        this.technologyRepository = technologyRepository;
        this.jobFieldRepository = jobFieldRepository;
        this.adminService = adminService;
        this.cvRepo = cvRepo;
        this.testRepository = testRepository;

    }

    public void broadcastCounts() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("technologies", technologyRepository.count());
        counts.put("jobFields", jobFieldRepository.count());
        counts.put("cvs",cvRepo.count());
        counts.put("tests",testRepository.count());
        messagingTemplate.convertAndSend("/topic/counts", counts);
        System.out.println("Sending counts: " + counts); // Verify numbers are correct
    }

    public void broadcastChartUpdates() {
        Map<String, Object> update = new HashMap<>();
        update.put("technologies", adminService.getStudentCountPerTechnology());
        update.put("jobFields", adminService.getStudentCountPerJobField());

        messagingTemplate.convertAndSend("/topic/chart-updates", update);
    }




}
