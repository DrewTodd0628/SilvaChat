package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "user")

//took out extends AuditModel
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column(name="user_name")
    private String name;
    @Column(name="timestamp")
    private String timestamp;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "user"
    )
    @JsonManagedReference
    //solve infinite recursion problem use @JsonManagedReference and @JsonBackReference
    private List< Message> messages;

    public User(){

    }
    public User(String name, String timestamp){
        this.name= name;
        this.timestamp = timestamp;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

}
