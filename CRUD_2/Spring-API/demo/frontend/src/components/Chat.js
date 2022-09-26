import React, { useEffect, useState} from "react";
//import {NavigationType, useNavigate} from "react-router-dom";
//import UserService from "../services/UserService";
//import MessageService from "../services/MessageService";

const Chat = () => {

    const[data, setData] = React.useState(null);
    const [user , setUser] = useState({
        id: "",
        name: "",
        timestamp: "",
    });
    const [message, setMessage] = useState({
        id: "",
        mess: "",
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


    return (
        <div>
            <h1>Session storage is</h1>
            {message.user_id}
        </div>
    );
}
export default Chat;