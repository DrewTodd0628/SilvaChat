package com.example.demo.Controller;


import com.example.demo.Entity.Message;
import com.example.demo.Entity.User;
import com.example.demo.Repo.MessageRepo;
import com.example.demo.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.validation.Valid;
import java.util.List;

//@RequestMapping("/api")
@CrossOrigin(value = "http://localhost:3000")
@RequestMapping("/api/v1/")
@RestController
//@CrossOrigin
public class MessageController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MessageRepo messageRepo;

    @GetMapping("/user/messages")
    public List<Message> getMessages(){

        return messageRepo.findAll();
    }

    @GetMapping("/user/{userId}/message")
    public List<Message> GetMessagesByUser(@PathVariable(value="userId") int userId) {
        return messageRepo.findByUserId(userId);
    }

    @GetMapping("/user/{userId}/message/{messageId}")
    public Message getMessageById(@PathVariable(value="userId")int userId,
                                  @PathVariable(value ="messageId")int messageId) throws Exception{
        if( !userRepo.existsById(userId)){
            throw new Exception("userId not found");
        }
        return messageRepo.findById(messageId).map(message -> {
            message.getMessage();
            return message;
        }).orElseThrow( ()-> new Exception("messageId is not found"));
    }


    @PostMapping("/user/{userId}/message")
    public Message createMessage(@PathVariable(value="userId") int userId,
                                 @Valid @RequestBody Message message) throws Exception {
        return userRepo.findById(userId).map(user ->{
            message.setUser(user);
            return messageRepo.save(message);
        }).orElseThrow( ()-> new Exception("user not found"));
    }

    @PutMapping("/user/{userId}/message/{messageId}")
    public Message updateMessage(@PathVariable(value="userId") int userId,
                                 @PathVariable(value ="messageId") int messageId,
                                 @Valid @RequestBody Message messageRequest) throws Exception{
        if( !userRepo.existsById(userId)){
            throw new Exception("userId not found");
        }
        return messageRepo.findById(messageId).map(message -> {
            message.setMessage(messageRequest.getMessage());
            return messageRepo.save(message);
        }).orElseThrow( () -> new Exception("message id not found"));
    }

    @DeleteMapping("/user/{userId}/message/{messageId}")
    public ResponseEntity< ? > deleteCourse (@PathVariable(value="userId") int userId,
                                            @PathVariable(value="messageId")int messageId )throws Exception{
        return messageRepo.findByIdAndUserId(messageId, userId).map(message -> {
            messageRepo.delete(message);
            return ResponseEntity.ok().build();
        }).orElseThrow( () -> new Exception(
                "Message not found with id "+messageId+" and userId "+userId));
    }


}
