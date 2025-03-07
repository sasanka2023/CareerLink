package com.example.CarrerLink_backend.service;

import com.example.CarrerLink_backend.utill.CommonFileSaveBinaryDataDto;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    CommonFileSaveBinaryDataDto createResource(MultipartFile file,String directory, String bucket);
}
