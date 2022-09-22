package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
    
}
