import React, { useEffect, useState} from "react";
import UserService from "../services/UserService";
import MessageService from "../services/MessageService";
import './style/chatStyle.css';
import Chat from "./Chat";

const EditText = (i, index, user, setGetAll, messageData, setMessageData) => {
    //console.log("Edit Text : ");
    const handleRemove=(id,user_id)=>{
        MessageService.deleteMessage(id, user_id).then(response =>{
            console.log("we've deleted this");
            console.log(response.data);
        })
    }
    const messageFromMe = i.user_id === user.id;
    const className = messageFromMe? "Messages-message currentUser" : "Messages-message";
   // console.log("outside of the parameter "+i.item.message_edit);
  // const handleMessage = (e)=>
    //const {value} = e.target;
    //setMessage({...message,[e.target.name]:value})
    //console.log(message.message);

    const handleChange = (event, index) =>{
        setGetAll(false);
        const {value}= event.target;
      //  setMessageData[index]({...messageData,[event.target.name]:value});
        // console.log("set get all = false");
    } 
   
    return(
        <li key={index} className={className}>
                <span className = "Message-content">
                    <div className="username">
                        {i.user_name}
                    </div>
                    {/* <div className="text">
                        {i.item.message_text}
                    </div> */}
                    <input
                        
                        type="text"
                        className="text"
                        name="message_edit"
                        aria-label="message"
                        value={i.message_edit}
                        onChange={(e,index) => handleChange(e,index)}
                    >
                    </input>
                    <div>
                        <button type="button" 
                        className="button"
                        onClick={()=>handleRemove(i.user_id,i.message_id)}
                        >
                            Delete
                        </button>
                    </div>
                </span>
                <br/>
        </li>
    )      
}

export default EditText;