package com.example.helloworld.controllers;

import com.example.helloworld.Entity.Chat;
import com.example.helloworld.models.Message;
import com.example.helloworld.services.ChatService;
import com.example.helloworld.services.MessageService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessageController {

  private final MessageService messageService;

  @Autowired
  ChatService chatService;

  @GetMapping("/public")
  public Message getPublic() {
    return messageService.getPublicMessage();
  }

  @GetMapping("/protected")
  public List<Chat> getProtected() {
    //return messageService.getProtectedMessage();
    return chatService.getMessages();
  }

  @GetMapping("/admin")
  @PreAuthorize("hasAuthority('read:admin-messages')")
  public Message getAdmin() {
    return messageService.getAdminMessage();
  }

  @PostMapping("/publi")
  public Message sendPublic(@PathVariable String str) {
    return messageService.sendPublicMessage(str);
  }

  @PostMapping("/send")
  public Message sendMessage(@RequestBody Chat chat) {
    chatService.sendMessage(chat);
    
    return messageService.getPublicMessage();
  }
}
