import React, { useEffect, useState, useRef} from "react";
//import {NavigationType, useNavigate} from "react-router-dom";
import EditText from "./EditText";
import UserService from "../services/UserService";
import MessageService from "../services/MessageService";

import './style/chatStyle.css';
const Chat = () => {

    const[getAll,setGetAll] = useState(true);
    const[data, setData] = React.useState(null);
    const[messageData,setMessageData]= React.useState([]);
    const[emptyList, setEmptyList] = React.useState([]);
    const[displayList, setDisplayList] = React.useState([]);
    const [user , setUser] = useState({
        id: "",
        name: "",
        timestamp: "",
    });
    const isFirstRender = useRef(true);
    const toggleIsGetAll = () =>{
        //passed function to setState
        setGetAll(current => current);
        console.log("toggleIsGetAll = "  + getAll);
    };
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
        const object =sessionStorage.getItem("user");
        console.log(" what what waht");
        console.log(object);
        setData(object);
        changeUserToValue();
    }, []);

    const changeUserToValue = ()=>{
        const object =sessionStorage.getItem("user");

        const array = object.split(",");
        const a0 = array[0].split(":");
        const a1 = array[1].split("\"");
        const a2 = array[2].split("\"");
       
        const num = Number(a0[1]);
        setUser({id:num, name:a1[3],timestamp:a2[3] });
        setMessage({user_id:num });
        
    }
    const handleMessage = (e)=>{
        const {value} = e.target;
        setMessage({...message,[e.target.name]:value})
    }
    const sendMessage = (e)=>{
       // e.preventDefault();
        console.log(message);
        MessageService.saveMessage(message.user_id,message).then(response => {
            setMsg({id:response.data.id,name:user.name,user_id: message.user_id,message: response.data.message});
            console.log("response.data");
            console.log(response.data);
            
        })
        .catch((error)=>{
            console.log(error.response.data);
        });

    };
    useEffect(() =>{
        if(isFirstRender.current){
            isFirstRender.current = false;
            return // return early if first render
        }
        toggleIsGetAll();
        console.log("Get all " + getAll);
    },[getAll]);
     useEffect(() =>{

        //get current value of getAll 
         toggleIsGetAll();
         
        // //if getAll = true, then get all messages
         if(getAll){
            
            UserService.getData().then(response=>{

                const text = response.data;
                //console.log(text);
                //zero out display list to empty array
                setDisplayList([]);
 
                //Change array of data to array of objects
                for(var i=0; i<text.length; i++){
                    var key,data;
                    var item = {}
                    for(var j=0; j<text[i].length;j++ ){
                        //key = text[i][j][0];
                        if(j==0){

                            key = "user_name"
                            data =text[i][j];
                            item[key] = data;
                        }
                        if(j==1){

                            key = "message_text";
                            data = text[i][j];
                            item[key] = data;
                        }
                        if(j==2){

                            key = "message_id";
                            data = text[i][j];
                            item[key] = data;
                        }
                        if(j==3){

                            key = "user_id";
                            data = text[i][j];
                            item[key] = data;

                            //add edit message
                            key = "message_edit";
                            data = text[i][1];
                            item[key] = data;

                            key = "current_user";
                            //if message is from current user set "current_user" to true
                            if(user.id = text[i][j] && user.name === text[i][0] ){
                                data = true;
                            }else{
                                data = false;
                            }
                            item[key] = data;

                            key= "editable"
                            //Only editable by current user, atm set to false
                            data = false;
                            item[key] = data;

                        }
                    }
                    displayList.push(item);

                // console.log(i + " now the list " + displayList);
                }

                setMessageData(displayList);
               // console.log(" index 0 : " + messageData[0].user_name + " " + messageData[0].message_text + " " + messageData[0].message_id + " " + messageData[0].user_id);
               // console.log(messageData);

            })
        }
    },[messageData]);

    return (
        <div>
         <h1 
            className="title"
        >Public Chat</h1>
            <div className = "chat">
                <div className ="messages-list">
                    {messageData.map((i)=> EditText(i, user, setGetAll, messageData,setMessageData))}
                </div>        
                <div className="enter-message">
                    <input 
                    type = "text" 
                    placeholder="enter message" 
                    name = "message"
                    value ={message.message || ''} 
                    onChange={(e)=>handleMessage(e)}
                    className="entered-message" 
                    // onKeyPress={event => {
                    //     if(event.key === 'Enter'){
                    //         sendMessage(message.message);
                    //     }
                    // }}
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