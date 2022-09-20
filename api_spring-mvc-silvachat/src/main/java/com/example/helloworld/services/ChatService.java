package com.example.helloworld.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.helloworld.DB.ChatDB;
import com.example.helloworld.Entity.Chat;

@Service
public class ChatService {

    @Autowired
    ChatDB chatDB;

    public List<Chat> getMessages() {
        return chatDB.findAll();
    }

    public Chat sendMessage(Chat chat) {
        return chatDB.save(chat);
    }
    
}
