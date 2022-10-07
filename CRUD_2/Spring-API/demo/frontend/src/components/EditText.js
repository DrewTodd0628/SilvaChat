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
        .catch((error)=>{
            console.log(error.response.data);
        });
    }
    const messageFromMe = i.user_id === user.id;
    const className = messageFromMe? "Messages-message currentUser" : "Messages-message";


    const handleChange = (event, message_id) =>{
        setGetAll(false);
        const {value}= event.target;
        updateEdit(message_id, value);
        
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

    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape"){
            event.target.blur();
        }
    }

    const onBlur = (message_id, message_edit, user_id, message_text) => {
        
        //Don't save an empty string
        if(message_edit.trim()=== ""){
            //Reset message_id and message_edit to original message
            console.log("Message text " + i.message_text);
            updateEdit(message_id, message_text);
            setGetAll(true);
        }else{
            const message = {
                id: message_id, 
                message: message_edit,
                user_id: user_id 
            };
            console.log("Messsage = " +message.id  + " " + message.message + " " + message.user_id);
            MessageService.saveMessage(user_id, message).then((response) => {
                //set response from database to data
                //setData(response.data);
                console.log("New message");
                console.log(response.data);
                setGetAll(true);
            })
            .catch((error) =>{
                console.log(error);
            });
        }
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
                    <div className = "Message-content">
                        {i.current_user ? (
                            /*yes it is editable*/
                            <input
                            type="text"
                            className="display"
                            name="message_edit"
                            aria-label="message"
                            value={i.message_edit}
                            onChange={(e) => handleChange(e, i.message_id)}
                            onKeyDown={onKeyDown}
                            onBlur={() => onBlur(i.message_id, i.message_edit, i.user_id, i.message_text)}
                            >   
                            </input>
                        ):(
                            /*No this is not editable */
                            <div
                            type="text"
                            className="text"
                            name="message_text"
                            aria-label="message"
                            value={i.message}
                            >
                                {i.message_text}
                            </div>
                        )}
                    </div>
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