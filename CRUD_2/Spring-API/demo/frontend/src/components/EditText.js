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

    const handleChange = (event, message_id) =>{
        setGetAll(false);
        const {value}= event.target;
        updateEdit(message_id, value);
        //messageData[index].message_edit = value;
        //console.log("............. " + messageData[index].message_edit);
        /////////const {value}= event.target;
      //  setMessageData[index]({...messageData,[event.target.name]:value});
        // console.log("set get all = false");
    } 
    //based on message_id and value
    const updateEdit = (message_id, message_edit) => {
        console.log("messsage_id = " +message_id);
        console.log("message_edit = " + message_edit);
        setMessageData(
            messageData.map((item) => {
                if (item.message_id === message_id){
                    return { ...item, message_edit};
                } else {
                    return item;
                }
            })
        );
    };

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
                        onChange={(e) => handleChange(e, i.message_id)}
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