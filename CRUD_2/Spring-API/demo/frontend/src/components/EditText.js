import React, { useEffect, useState} from "react";
import UserService from "../services/UserService";
import MessageService from "../services/MessageService";
import './style/chatStyle.css';
import Chat from "./Chat";

const EditText = (i, user, setGetAll, messageData, setMessageData) => {

    const handleRemove=(id,user_id)=>{
        MessageService.deleteMessage(id, user_id).then(response =>{
            console.log("we've deleted this");
            console.log(response.data);
            //console.log(messageData);
            //updateDelete(id);
            //console.log("we are deleting ???? let's see if messageData has updated");
            //console.log(messageData);
            
        })
        .catch((error)=>{
            console.log(error.response.data);
        });
    }
    const messageFromMe = i.current_user;
    const className = messageFromMe? "Messages-message currentUser" : "Messages-message";

    const handleChange = (event, message_id) =>{

        setGetAll(false);
        const {value}= event.target;
        updateMessageEdit(message_id, value);
        
    } 
    const handleEditable = (message_id) =>{

        setGetAll(false);
        const value = true;
        updateEditable(message_id, value);
        
    }
    //based on message_id and value
    const updateMessageEdit = (message_id, message_edit) => {
        
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

    const updateEditable = (message_id, editable) => {

        setMessageData(
            messageData.map((item) => {
                if (item.message_id === message_id){
                    return { ... item, editable};
                }else{
                    return item;
                }
            })
        );
    };

    const updateDelete = (message_id)=>{

        setMessageData(
            messageData.map((item) => {
                if (item.message_id === message_id){

                }else{
                    return item;
                }
            })
        )
        console.log("lets check now");
        console.log(messageData);
    }

    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape"){
            event.target.blur();
        }
    }

    const onBlur = (message_id, message_edit, user_id, message_text) => {
        
        //Don't save an empty string
        if(message_edit.trim()=== ""){
            //Reset message_id and message_edit to original message
            updateMessageEdit(message_id, message_text);
            setGetAll(true);
        }else{
            const message = {
                id: message_id, 
                message: message_edit,
                user_id: user_id 
            };

            MessageService.saveMessage(user_id, message).then((response) => {
                //set response from database to data
                //setData(response.data);
                console.log("New message");
                console.log(response.data);

                //Now re-allow edits
                const value = false; 
                updateEditable(message.id, value);
                setGetAll(true);

            })
            .catch((error) =>{
                console.log(error);
            });
        }
    }

    return(
        <li key={i.message_id} className={className}>
                <span className = "Message-content">
                    <div className="username">
                        {i.user_name}
                    </div>
                    {i.current_user ? (
                         /*yes it is editable*/
                        i.editable ? (
                            /*editable = true*/ 
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
                            /*editable = false */
                            <div type="text" className="text">
                                {i.message_edit}
                            </div>
                        )
           
                    ):(
                        /*No this is not the current user*/
                        <div
                        type="text"
                        className="text"
                        name="message_text"
                        aria-label="message"
                        value={i.message_text}
                        >
                            {i.message_text}
                        </div>
                    )}
                    
                    <div>
                        {i.current_user === true &&
                            <button type="button" 
                            className="button"
                            onClick={()=>handleRemove(i.user_id,i.message_id)}
                            >
                                Delete
                            </button>
                        }
                        { i.editable === false && i.current_user === true &&
                            <button type ="button"
                            className="button"
                            onClick={()=>handleEditable(i.message_id)}
                            >
                                Update
                            </button>
                        }
                    </div>
                </span>
                <br/>
        </li>
    )      
}

export default EditText;