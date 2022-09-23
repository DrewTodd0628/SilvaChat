package com.example.demo.Entity;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "user")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//took out extends AuditModel
public class User {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    @Column(name="id")
    private int id;

    @Column(name="user_name")
    private String name;
    @Column(name="timestamp")
    private String timestamp;

    @OneToMany(mappedBy = "user" , cascade = {CascadeType.ALL})

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
