package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.User;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
    User findByName(String name);

    @Query(value = "SELECT u.name, m.message, m.id, u.id FROM User u, Message m WHERE u.id = m.user.id Order By m.id")
    List<Object[]> queryBy();


}
