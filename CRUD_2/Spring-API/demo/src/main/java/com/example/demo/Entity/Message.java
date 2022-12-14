package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="message")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "message")
    private String message;

//    @ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn( name = "user_id", referencedColumnName = "id")
    //solve infinite recursion problem use @JsonManagedReference and @JsonBackReference
    @JsonBackReference
    private User user;

    public Message(){

    }

    public Message(String message){
        this.message=message;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    @Override
    public String toString(){
        return "Message [id=" + id + ", message=" + message + "]";
    }
}