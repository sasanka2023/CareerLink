package com.example.CarrerLink_backend.config;

import com.example.CarrerLink_backend.entity.Company;
import org.springframework.context.ApplicationEvent;

public class CompanyRegisteredEvent extends ApplicationEvent {

    private final Company company;
    public CompanyRegisteredEvent(Object source, Company company) {
        super(source);
        this.company = company;
    }

    public Company getCompany() {
        return company;
    }
}
