package com.example.CarrerLink_backend.config;


import com.example.CarrerLink_backend.dto.JobgetResponseDTO;
import com.example.CarrerLink_backend.entity.Job;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        // Add the type map for custom mappings
        modelMapper.typeMap(Job.class, JobgetResponseDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getCompany().getName(), JobgetResponseDTO::setCompany);
        });

        // Return the configured ModelMapper instance
        return modelMapper;

    }
}
