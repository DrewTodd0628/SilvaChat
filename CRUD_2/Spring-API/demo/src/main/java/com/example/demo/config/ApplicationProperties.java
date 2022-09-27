package com.example.demo.config;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import lombok.Value;

@Value
@ConstructorBinding
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {


  private String clientOriginUrl;

  private String audience;
}
