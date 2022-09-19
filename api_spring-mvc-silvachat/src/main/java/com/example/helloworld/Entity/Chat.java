package com.example.helloworld.Entity;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Chat {
    
    int id;
    String name;
    String messsage;
    String timestamp;

    
    @Override
    public String toString() {
        return "Chat [id=" + id + ", messsage=" + messsage + ", name=" + name + ", timestamp=" + timestamp + "]";
    }

    
}
