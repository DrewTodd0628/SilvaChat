import React, { useEffect, useState} from "react";
//import {NavigationType, useNavigate} from "react-router-dom";
//import UserService from "../services/UserService";
//import MessageService from "../services/MessageService";

//const stringifiedUser = localStorage.getItem('user');
//const userAsObjectAgain = JSON.parse(stringifiedUser);

const Chat = () => {

    const[data, setData] = React.useState(null);
    
     //var object = window.sessionStorage.getItem("user");
    //var object = "helllooo";
    //setData(object);
    useEffect( () => {
        var object =sessionStorage.getItem("user");
        setData(object);
    }, []);

    return (
        <div>
            <h1>Session storage is</h1>
            {/* {data}    */}
            {data}
        </div>
    );
}
export default Chat;