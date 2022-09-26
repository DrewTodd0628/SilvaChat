import React, { useEffect, useState} from "react";
//import {NavigationType, useNavigate} from "react-router-dom";
//import UserService from "../services/UserService";
import MessageService from "../services/MessageService";
const Chat = () => {

    const[data, setData] = React.useState(null);
    const[messageData,setMessageData]= React.useState(null);
    const [user , setUser] = useState({
        id: "",
        name: "",
        timestamp: "",
    });
    const [message, setMessage] = useState({
        id: "",
        message: "",
        user_id: "",
    })
   // {"id":1,"name":"k","timestamp":"m","messages":null}
    //get sessionStorage user and set to data
    useEffect( () => {
        var object =sessionStorage.getItem("user");
        setData(object);
        changeUserToValue();
    }, []);
    const changeUserToValue = ()=>{
        const object =sessionStorage.getItem("user");
        const array = object.split(",");

        const a0 = array[0].split(":");
        const a1 = array[1].split("\"");
        const a2 = array[2].split("\"");
        
        setUser({id:a0[1], name:a1[3],timestamp:a2[3] });
        setMessage({user_id:a0[1]});
    }
    const handleMessage = (e)=>{
        const {value} = e.target;
        //setMessage({mess: value});
        setMessage({...message,[e.target.name]:value})
        console.log(message.message);
    }
    const sendMessage = (e)=>{
        e.preventDefault();
        MessageService.saveMessage(user.id,message).then((response) => {
            //set response from database to data
            setMessageData(response.data);
            
        })
        .catch((error) =>{
            console.log(error);
        });
    }
   // const [mainChat, setMainChat] = useState([]);
    //const [username, setUserName] = useState("CHATROOM");
    return (
        <div>
            <h1>Session storage is</h1>
            {data}
            <h2>user data is now</h2>
            {user.id}<br></br> {user.name}<br></br> {user.timestamp}
            <h3>message user_id is now</h3>
            {message.user_id}
            <div className = "chat">
                <ul className="main-chat">
                    
                </ul>
                <div className="enter-message">
                    <input 
                    type = "text" 
                    placeholder="enter message" 
                    name = "message"
                    value ={message.message} 
                    onChange={(e)=>handleMessage(e)}
                    className="entered-message" 
                    />
                    <button type="button" 
                    className="send-button" 
                    onClick={sendMessage}>
                        send</button>
                </div>
                
            </div>
        </div>
    );
}
export default Chat;