package com.example.demo.Repo;

import com.example.demo.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepo extends JpaRepository<Message, Integer>{
    // List<Message> findByUserId(int userId);
    // Optional<Message> findByIdAndUserId(int id, int userId);
    List<Message> findAllBySenderID(@Param("senderID") int senderID);

}