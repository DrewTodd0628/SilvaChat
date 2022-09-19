package com.example.helloworld.models;

import lombok.Value;

@Value
public class Message {

  private Metadata metadata;

  private String text;

  public static Message from(final String text) {
    return new Message(Metadata.ofDefaults(), text);
  }

  @Value
  private static class Metadata {

    private String api;

    private String branch;

    public static Metadata ofDefaults() {
      return new Metadata(
        "api_spring-boot_java_hello-world",
        "basic-role-based-access-control"
      );
    }
  }
}
