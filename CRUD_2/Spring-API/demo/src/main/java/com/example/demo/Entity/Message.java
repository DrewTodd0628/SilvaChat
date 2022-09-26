package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private int senderID;

    @Column(name = "message")
    private String message;
    private String timestamp;

    // @ManyToOne(cascade = CascadeType.ALL)
    // @JoinColumn( name = "user_id")
    // //solve infinite recursion problem use @JsonManagedReference and @JsonBackReference
    // @JsonBackReference
    // private User user;

    // public Message(){

    // }

    // public Message(String message){
    //     this.message=message;
    // }

    // public int getId() {
    //     return id;
    // }

    // public void setId(int id) {
    //     this.id = id;
    // }

    // public String getMessage() {
    //     return message;
    // }

    // public void setMessage(String message) {
    //     this.message = message;
    // }

    // public User getUser() {
    //     return user;
    // }

    // public void setUser(User user) {
    //     this.user = user;
    // }
    // @Override
    // public String toString(){
    //     return "Message [id=" + id + ", message=" + message + "]";
    // }
}