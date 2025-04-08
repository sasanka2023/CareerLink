package com.example.CarrerLink_backend.entity;

import com.example.CarrerLink_backend.entity.Company;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "company_image")
public class CompanyImage  {

    @Id
    private String id;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String type; // "company_image" or "cover_image"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
