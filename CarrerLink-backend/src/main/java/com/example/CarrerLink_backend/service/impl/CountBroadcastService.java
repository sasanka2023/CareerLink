package com.example.CarrerLink_backend.service.impl;

import com.example.CarrerLink_backend.repo.JobFieldRepo;
import com.example.CarrerLink_backend.repo.TechnologyRepo;
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
    public CountBroadcastService(SimpMessagingTemplate messagingTemplate,
                                 TechnologyRepo technologyRepository,
                                 JobFieldRepo jobFieldRepository, AdminService adminService) {
        this.messagingTemplate = messagingTemplate;
        this.technologyRepository = technologyRepository;
        this.jobFieldRepository = jobFieldRepository;
        this.adminService = adminService;
    }

    public void broadcastCounts() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("technologies", technologyRepository.count());
        counts.put("jobFields", jobFieldRepository.count());

        messagingTemplate.convertAndSend("/topic/counts", counts);
    }

    public void broadcastChartUpdates() {
        Map<String, Object> update = new HashMap<>();
        update.put("technologies", adminService.getStudentCountPerTechnology());
        update.put("jobFields", adminService.getStudentCountPerJobField());

        messagingTemplate.convertAndSend("/topic/chart-updates", update);
    }


}
