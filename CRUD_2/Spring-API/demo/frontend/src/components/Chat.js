import React, { useEffect, useState} from "react";
//import {NavigationType, useNavigate} from "react-router-dom";
import UserService from "../services/UserService";
import MessageService from "../services/MessageService";
import './style/chatStyle.css';
const Chat = () => {

    const[data, setData] = React.useState(null);

    //user_name, message, id, edit string
    // const [item, setItem] = useState({
    //     user_name : "",
    //     message_text : "",
    //     message_id : "",
    //     user_id : "",
    //     message_edit : "",
    // });


    //const value: string | null
    //const [value, setValue]=useState<string | null>(null);
    const[value, setValue]=useState(null);
    const [editingValue,setEditingValue] = useState(value);

    const[messageData,setMessageData]= React.useState([]);
    const[emptyList, setEmptyList] = React.useState([]);
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
    const [deleteMsg, setDeleteMsg] = useState({
        id: "",
        user_id: "",
    });
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
           
            //zero out display list to empty array
            setDisplayList([]);
 
            //give the text props as it response.data doesn't have column headers
            for(let i=0; i<text.length; i++){
                 
                 const item = {
                    user_name : ""+text[i][0],
                    message_text : ""+text[i][1],
                    message_id : ""+text[i][2],
                    user_id : ""+text[i][3],
                    message_edit : "",
                };

                displayList.push({item});

               // console.log(i + " now the list " + displayList);
            }

            setMessageData(displayList);
            console.log(messageData);

        })
    },[messageData]);
    const handleRemove=(id,user_id)=>{
        MessageService.deleteMessage(id, user_id).then(response =>{
            console.log("we've deleted this");
            console.log(response.data);
        })
    }

    let RenderMessage = (i) =>{
        const messageFromMe = i.item.user_id === user.id;
        const className = messageFromMe? "Messages-message currentUser" : "Messages-message";
        

        //if value is not initialize it initialize
        // if( value === null){
        //     console.log("value is...");
        //     setValue(i.message_text);
        //     console.log( i.message_text);
        // }
                
        // const onChange = (event) => setValue(event.target.value);

        // const onKeyDown = (event) =>{
        //     if(event.key === "Enter" || event.key ==="Escape"){
        //         event.target.blur();
        //     }
        // }

        // const onBlur = (event) => {
        //     if (event.target.value.trim() === ""){
        //         setEditingValue(value);
        //     }else{
        //         setValue(event.target.value);
        //         console.log("Message value is now : " + value);
        //     }
        // }

        return(
            <li key={i.message_id} className={className}>
                    <span className = "Message-content">
                        <div className="username">
                            {i.item.user_name}
                        </div>
                        <div className="text">
                            {i.item.message_text}
                        </div>
                        {/* <input
                            type="text"
                            className="text"
                            aria-label="message"
                            value={value}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            onBlur={onBlur}
                        >
                        </input> */}
                        <div>
                            <button type="button" 
                            className="button"
                            onClick={()=>handleRemove(i.item.user_id,i.item.message_id)}
                            >
                                Delete
                            </button>
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
                    {messageData.map((i)=> RenderMessage(i))}
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