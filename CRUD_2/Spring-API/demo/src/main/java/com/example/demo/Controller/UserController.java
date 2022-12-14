package com.example.demo.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.Repo.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.User;
import com.example.demo.Repo.UserRepo;

import javax.management.Query;
import javax.validation.Valid;

@CrossOrigin(value = "http://localhost:3000")
@RequestMapping("/api/v1/")
@RestController
public class UserController {
    
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private MessageRepo messageRepo;

    @GetMapping("/user/{name}")
    public int getUserByName( @PathVariable(value="name") String name){

        return userRepo.findByName(name).getId();
    }

    @GetMapping("/user")
    public List<User> GetUsers() {
        return userRepo.findAll();
    }
    @GetMapping("/usermessages")
    public  List<Object[]> getData(){
        //List<Object[]> resultList = userRepo .queryBy();
        List<Object[]> resultList = userRepo.queryBy();
        resultList.forEach(System.out::println);
        return resultList;

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
