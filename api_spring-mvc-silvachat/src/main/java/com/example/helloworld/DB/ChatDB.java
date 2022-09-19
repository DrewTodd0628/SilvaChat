package com.example.helloworld.DB;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.helloworld.Entity.Chat;

@Repository
public interface ChatDB extends JpaRepository<Chat, Integer>{
    
}
