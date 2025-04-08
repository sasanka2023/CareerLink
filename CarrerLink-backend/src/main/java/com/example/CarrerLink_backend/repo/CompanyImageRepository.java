package com.example.CarrerLink_backend.repo;

import com.example.CarrerLink_backend.entity.CompanyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CompanyImageRepository extends JpaRepository<CompanyImage, String> {
    Optional<CompanyImage> findByCompanyIdAndType(long companyId, String type);
}
