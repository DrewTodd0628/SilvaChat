import React, { useEffect, useState} from "react";
//import {NavigationType, useNavigate} from "react-router-dom";
//import UserService from "../services/UserService";
import MessageService from "../services/MessageService";
const Chat = () => {

    const[data, setData] = React.useState(null);
    const[newMessage, setNewMessage] =React.useState([]);
    const[messageData,setMessageData]= React.useState([]);
    const[messageList, setMessageList] = React.useState([]);
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
        // const newMessages=[...messageData];
        // newMessages.push(msg);
        // setMessageData(newMessages);

        MessageService.getMessages().then(response=>{
            setMessageList([...response.data]);
            setMessageData(messageList);
            console.log("response");
            console.log(response.data);
            //const newMessages=[...messageData];
             //newMessages.push(msg);
             //setMessageData(newMessages);
        })
        
    },[messageData]);
    useEffect(() => {
        console.log(msg);

    },[messageData])

    return (
        <div>
            <h1> Chat  </h1>
            <div className = "chat">
                <div className ="chat-message">
                    {messageData.map((i)=>
                        <div key ={i.id}>
                            <p>{i.message}</p>
                            <span>{i.name}</span>
                        </div>
                    )}                
                </div>
                        {/* if(i.name === user.name){ */}
                        {/* //     return(
                        //         <div className ="msg">
                        //             <p>{i.message}</p>
                        //             <span>{i.name}</span>
                        //         </div>
                        
                    //         );
                    //     } else{ */}
                    {/* //         return (
                    //             <div className ="msg msg-right">
                    //                 <p>{i.message}</p>
                    //                 <span>{i.name}</span>
                    //             </div>
                    //         );
                    //     }
                    
                    // })}
                 */}
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