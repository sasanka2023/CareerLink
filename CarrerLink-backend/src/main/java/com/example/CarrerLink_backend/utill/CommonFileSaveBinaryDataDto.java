package com.example.CarrerLink_backend.utill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonFileSaveBinaryDataDto {
    private Blob hash;
    private String directory;
    private String fileName;
    private String url;
}
