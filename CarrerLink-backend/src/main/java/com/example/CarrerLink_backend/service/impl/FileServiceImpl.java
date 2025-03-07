package com.example.CarrerLink_backend.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.CarrerLink_backend.service.FileService;
import com.example.CarrerLink_backend.utill.CommonFileSaveBinaryDataDto;
import com.example.CarrerLink_backend.utill.ImageUploadGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    @Autowired
    private AmazonS3 amazonS3; // Only use one bean

    private final ImageUploadGenerator imageUploadGenerator;

    @Override
    public CommonFileSaveBinaryDataDto createResource(MultipartFile file, String directory, String bucket) {
        try {
            String fileName = file.getOriginalFilename();
            String newFileName = imageUploadGenerator.generateResourceName(fileName, UUID.randomUUID().toString());
            String s3Path = directory + newFileName;

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, s3Path, file.getInputStream(), metadata)
                    ;

            amazonS3.putObject(putObjectRequest);

            return new CommonFileSaveBinaryDataDto(
                    null,
                    directory,
                    null,
                    amazonS3.getUrl(bucket, s3Path).toString() // Fixed URL retrieval
            );

        } catch (IOException e) {
            throw new RuntimeException("S3 upload failed: " + e.getMessage(), e);
        }
    }
}
