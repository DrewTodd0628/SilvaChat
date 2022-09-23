package com.example.demo.Repo;

import com.example.demo.Entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Chat;

@Repository
public interface ChatRepo extends JpaRepository<Chat, Integer>{

}