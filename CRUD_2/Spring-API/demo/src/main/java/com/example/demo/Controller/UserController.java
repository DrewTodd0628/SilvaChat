package com.example.demo.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import javax.validation.Valid;

@CrossOrigin(value = "http://localhost:3000")
@RequestMapping("/api/v1/")
@RestController
public class UserController {
    
    @Autowired
    private UserRepo userRepo;

    @GetMapping("/user/{name}")
    public int getUserByName( @PathVariable(value="name") String name){

        return userRepo.findByName(name).getId();
    }

    @GetMapping("/user")
    public List<User> GetUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable(value="id") int userId) throws Exception{
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new Exception("User not found : "+userId));
        return ResponseEntity.ok().body(user);
    }


    @PostMapping("/user")
    public User createUser(@RequestBody User user) {
        return userRepo.save(user);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity< User> updateUser(
            @PathVariable(value = "id") int userId,
            @Valid @RequestBody User userDetails) throws Exception{
        User user = userRepo.findById(userId)
                .orElseThrow( ()-> new Exception ("User not found : "+userId));
        user.setName(user.getName());
        final User updatedUser = userRepo.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    public Map< String, Boolean> deleteUser(
            @PathVariable(value = "id") int userId) throws Exception{
        User user = userRepo.findById(userId)
                .orElseThrow( ()-> new Exception("Instructor not found :: "+ userId));
        userRepo.delete(user);
        Map < String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
