package com.example.CarrerLink_backend.utill;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StandardResponse {
    private boolean success;
    private String message;
    private Object data;


}
