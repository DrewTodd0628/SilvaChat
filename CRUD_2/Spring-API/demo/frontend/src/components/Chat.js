import React, { useEffect, useState} from "react";
//import {NavigationType, useNavigate} from "react-router-dom";
import UserService from "../services/UserService";
import MessageService from "../services/MessageService";
import './style/chatStyle.css';
const Chat = () => {

    const[data, setData] = React.useState(null);
    const[messageData,setMessageData]= React.useState([]);
    const[displayList, setDisplayList] = React.useState([]);
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
    const [msg, setMsg] = useState({
        id: "",
        name: "",
        user_id:"",
        message: "",
    })

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
        setMessage({...message,[e.target.name]:value})
        console.log(message.message);
    }
    const sendMessage = (e)=>{
        e.preventDefault();
        MessageService.saveMessage(user.id,message).then(response => {
            setMsg({id:response.data.id,name:user.name,user_id: message.user_id,message: response.data.message});
            console.log("response.data");
            console.log(response.data);
            
        })

    };
     useEffect(() =>{
        UserService.getData().then(response=>{

            const text = response.data;
            //give the text props as it response.data doesn't have column headers
            for(let i=0; i<text.length; i++){
                //user_name, message, id
                text[i][0]=""+text[i][0];
                text[i][1]=""+text[i][1];
                text[i][2]=""+text[i][2];
            }

            setDisplayList([...text]);
            setMessageData(displayList);
            console.log(messageData);
        })
    },[messageData]);

  

    let renderMessage = (i) =>{
        const messageFromMe = i[0]=== user.name;
        const className = messageFromMe? "Messages-message currentUser" : "Messages-message";
        return(
            <li key={i[2]} className={className}>
                    <span className = "Message-content">
                        <div className="username">
                            {i[0]}
                        </div>
                        <div className="text">
                            {i[1]}
                        </div>
                    </span>
                    <br/>
            </li>
        )      
    }

    return (
        <div>
            <h1> Chat  </h1>
            <div className = "chat">
                <div className ="messages-list">
                    {messageData.map((i)=> renderMessage(i))}
                </div>        
                <div className="enter-message">
                    <input 
                    type = "text" 
                    placeholder="enter message" 
                    name = "message"
                    value ={message.message} 
                    onChange={(e)=>handleMessage(e)}
                    className="entered-message" 
                    onKeyPress={event => {
                        if(event.key === 'Enter'){
                            sendMessage(message.message);
                        }
                    }}
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