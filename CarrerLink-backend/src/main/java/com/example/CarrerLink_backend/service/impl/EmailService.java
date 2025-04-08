package com.example.CarrerLink_backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendApprovalEmail(String toEmail, String adminName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Admin Account Approved");
        message.setText("Dear " + adminName + ",\n\nYour admin account has been approved. You can now access the admin dashboard.");
        mailSender.send(message);
    }

    public void sendEmail(String email, String jobApplicationApproved, String emailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(jobApplicationApproved);
        message.setText(emailBody);
        mailSender.send(message);
    }
}
