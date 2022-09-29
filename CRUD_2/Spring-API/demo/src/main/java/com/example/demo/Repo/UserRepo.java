package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.User;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer>{
    User findByName(String name);

//    @Query( value = "SELECT u.user_name, m.message, m.id " +
//            "FROM user u, message m" +
//            "WHERE u.id = m.user_id", nativeQuery = true)
    @Query(value = "SELECT u.name, m.message, m.id FROM User u, Message m WHERE u.id = m.user.id Order By m.id")
    List<Object[]> queryBy();


}
