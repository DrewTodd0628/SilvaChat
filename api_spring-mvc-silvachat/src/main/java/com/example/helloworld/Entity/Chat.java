package com.example.helloworld.Entity;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Chat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String name;
    String messsage;
    String timestamp;

    
    @Override
    public String toString() {
        return "Chat [id=" + id + ", messsage=" + messsage + ", name=" + name + ", timestamp=" + timestamp + "]";
    }

    
}
