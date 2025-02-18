package com.example.CarrerLink_backend.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserSaveRequestDTO {


    private String username;
    private String password;
    private String profilepic;

}
