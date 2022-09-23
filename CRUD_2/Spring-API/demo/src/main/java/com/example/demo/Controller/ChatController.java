package com.example.demo.Controller;

import java.util.List;

import com.example.demo.Entity.Chat;
import com.example.demo.Repo.ChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;

@RequestMapping("/api")
@RestController
//@CrossOrigin
public class ChatController {

    @Autowired
    private ChatRepo chatRepo;


    @GetMapping("/chat/")
    public List<Chat> GetChats() {
        return chatRepo.findAll();
    }

    @GetMapping("/chat/{id}")
    public Chat GetChatByID(@PathVariable int id) {
        return chatRepo.findById(id).orElse(null);
    }

    @PostMapping("/chat/")
    public Chat PostChat(@RequestBody Chat chat) {
        return chatRepo.save(chat);
    }

    @PutMapping("/chat/")
    public Chat PutChat(@RequestBody Chat chat) {

        return chatRepo.save(chat);
    }

    @DeleteMapping("/chat/{id}")
    public Integer DeleteUser(@PathVariable int id) {
        chatRepo.deleteById(id);
        return id;
    }
}
