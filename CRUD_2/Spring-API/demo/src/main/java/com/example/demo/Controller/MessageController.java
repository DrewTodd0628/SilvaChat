package com.example.demo.Controller;


import com.example.demo.Entity.Message;
import com.example.demo.Repo.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

//@RequestMapping("/api")
@CrossOrigin(value = "http://localhost:3000")
@RequestMapping("/api/v1/")
@RestController
//@CrossOrigin
public class MessageController {

    @Autowired
    private MessageRepo messageRepo;
    
    // Get current system time
    // Used to set message timestamps
    LocalDateTime myDateObj = LocalDateTime.now();  
    DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("HH:mm MM/dd");  
    String formattedDate = myDateObj.format(myFormatObj);


    // Still yet to figure out how to make this work
    @GetMapping("/chat/sender/{id}")
    public List<Message> GetMessagesBySender(@PathVariable int id) {
        return messageRepo.findAllBySenderID(id);
    }

    @GetMapping("/chat/")
    public List<Message> GetAllMessages() {
        return messageRepo.findAll();
    }

    // For testing purposes
    @GetMapping("/chat/protected")
    public List<Message> GetAllProtectedMessages() {
        return messageRepo.findAll();
    }

    @PostMapping("/chat/")
    public Message createMessage(@RequestBody Message message){
        message.setTimestamp(formattedDate);
        return messageRepo.save(message);
    }

    @PutMapping("/chat/")
    // @PreAuthorize("hasAuthority('update:messages')")
    public Message updateMessage(@Valid @RequestBody Message message) throws Exception{
        if( !messageRepo.existsById(message.getId())){
            throw new Exception("message not found.");
        } else {
            message.setTimestamp(formattedDate);
            return messageRepo.save(message);
        }
    }


    @DeleteMapping("/chat/{id}")
    public String deleteMessage(@PathVariable int id) throws Exception {
        if( !messageRepo.existsById(id)){
            throw new Exception("message not found.");
        } else {
            messageRepo.deleteById(id);
            return "Deleted message by ID: " + id;
        }
    }
}
