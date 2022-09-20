package com.example.helloworld.services;

import com.example.helloworld.models.Message;

import org.springframework.stereotype.Service;

@Service
public class MessageService {

  public Message getPublicMessage() {
    final var text = "This is a public message.";

    return Message.from(text);
  }

  public Message sendPublicMessage(String str) {
    final var text = str;

    return Message.from(text);
  }

  public Message getProtectedMessage() {
    final var text = "This is a protected message";

    return Message.from(text);
  }

  public Message getAdminMessage() {
    final var text = "This is an admin message.";

    return Message.from(text);
  }
}
