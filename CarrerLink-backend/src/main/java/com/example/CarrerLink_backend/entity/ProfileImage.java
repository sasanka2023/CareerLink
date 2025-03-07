package com.example.CarrerLink_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "profile_image")
public class ProfileImage {
    @Id
    private String id;

    @Lob
    private String directory;

    @Lob
    private String url;

    @Lob
    private String hash;

    @Lob
    private String fileName;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;


}
