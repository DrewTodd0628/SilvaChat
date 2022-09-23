package com.example.demo.Controller;

import java.util.List;

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
import org.springframework.http.MediaType;

import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;

@RequestMapping(path = "api/", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserRepo userRepo;

    @GetMapping("/")
    public List<User> GetUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/{id}")
    public User GetUserByID(@PathVariable int id) {
        return userRepo.findById(id).orElse(null);
    }

    @PostMapping("/")
    public User PostUser(@RequestBody User user) {
        return userRepo.save(user);
    }

    @PutMapping("/")
    public User PutUser(@RequestBody User user) {
        // User target = userRepo.findById(user.getId()).orElse(null);
        // target.setName(target.getName());
        // target.setEmail(target.getEmail());
        // target.setPassword(target.getPassword());

        return userRepo.save(user);
    }

    @DeleteMapping("/{id}")
    public Integer DeleteUser(@PathVariable int id) {
        userRepo.deleteById(id);
        return id;
    }
}
